import { Resend } from "resend";
import { headers } from "next/headers";

// Vercel rejects request bodies over 4.5 MB, so keep the CV comfortably below that
const MAX_CV_BYTES = 4 * 1024 * 1024;

// In-memory rate limit: 5 requests per IP per hour (per server instance)
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isPdf(bytes: Buffer): boolean {
  return bytes.subarray(0, 5).toString("latin1") === "%PDF-";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { RESEND_API_KEY, RESEND_FROM, CAREERS_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !CAREERS_EMAIL) {
    console.error("Careers form: RESEND_API_KEY, RESEND_FROM or CAREERS_EMAIL is not set");
    return Response.json({ error: "Service unavailable" }, { status: 503 });
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill this, humans don't
  if (field(formData, "website")) {
    return Response.json({ ok: true }); // silent discard
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const position = field(formData, "position");
  const notes = field(formData, "notes") || null;
  const cv = formData.get("cv");

  if (!name || name.length > 100)
    return Response.json({ error: "Invalid name" }, { status: 400 });
  if (!phone || phone.length > 50)
    return Response.json({ error: "Invalid phone" }, { status: 400 });
  if (!email || email.length > 254 || !EMAIL_RE.test(email))
    return Response.json({ error: "Invalid email" }, { status: 400 });
  if (!position || position.length > 200)
    return Response.json({ error: "Invalid position" }, { status: 400 });
  if (notes && notes.length > 2000)
    return Response.json({ error: "Notes too long" }, { status: 400 });

  const attachments: { filename: string; content: Buffer }[] = [];
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES)
      return Response.json({ error: "CV too large" }, { status: 413 });
    const buffer = Buffer.from(await cv.arrayBuffer());
    if (!isPdf(buffer))
      return Response.json({ error: "CV must be a PDF" }, { status: 400 });
    const safeFilename = `CV - ${name.replace(/[^\p{L}\p{N} ._-]/gu, "").slice(0, 60) || "kandidat"}.pdf`;
    attachments.push({ filename: safeFilename, content: buffer });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safePosition = escapeHtml(position);
  const safeNotes = notes ? escapeHtml(notes) : null;
  const subjectText = `Nova prijava - ${position} | ${name}`.replace(/[\r\n]+/g, " ");

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `Zeppelin Careers <${RESEND_FROM}>`,
    to: CAREERS_EMAIL,
    replyTo: email,
    subject: subjectText,
    html: `
      <p><strong>Pozicija:</strong> ${safePosition}</p>
      <p><strong>Ime:</strong> ${safeName}</p>
      <p><strong>Telefon:</strong> ${safePhone}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      ${safeNotes ? `<p><strong>Napomena:</strong> ${safeNotes}</p>` : ""}
    `,
    attachments,
  });

  if (error) {
    console.error("Careers form: Resend error", error);
    return Response.json({ error: "Could not send application" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
