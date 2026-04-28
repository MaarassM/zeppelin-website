import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const position = formData.get("position") as string;
  const notes = formData.get("notes") as string | null;
  const cv = formData.get("cv") as File | null;

  const attachments: { filename: string; content: Buffer }[] = [];
  if (cv && cv.size > 0) {
    const buffer = Buffer.from(await cv.arrayBuffer());
    attachments.push({ filename: cv.name, content: buffer });
  }

  const { error } = await resend.emails.send({
    from: "Zeppelin Careers <onboarding@resend.dev>",
    to: process.env.CAREERS_EMAIL!,
    subject: `Nova prijava — ${position} | ${name}`,
    html: `
      <p><strong>Pozicija:</strong> ${position}</p>
      <p><strong>Ime:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${notes ? `<p><strong>Napomena:</strong> ${notes}</p>` : ""}
    `,
    attachments,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
