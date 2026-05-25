import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit: 5 requests per IP per hour
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const formData = await request.formData();

  // Honeypot — bots fill this, humans don't
  const website = formData.get("website") as string | null;
  if (website) {
    return Response.json({ ok: true }); // silent discard
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const position = (formData.get("position") as string | null)?.trim() ?? "";
  const notes = (formData.get("notes") as string | null)?.trim() ?? null;
  const cv = formData.get("cv") as File | null;

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
  if (cv && cv.size > 0) {
    const buffer = Buffer.from(await cv.arrayBuffer());
    attachments.push({ filename: cv.name, content: buffer });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safePosition = escapeHtml(position);
  const safeNotes = notes ? escapeHtml(notes) : null;

  const { error } = await resend.emails.send({
    from: `Zeppelin Careers <${process.env.RESEND_FROM}>`,
    to: process.env.CAREERS_EMAIL!,
    subject: `Nova prijava — ${safePosition} | ${safeName}`,
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
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
