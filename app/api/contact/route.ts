import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  subject?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (payload.company) {
    return Response.json({ message: "Message sent." });
  }

  const name = normalize(payload.name);
  const subject = normalize(payload.subject);
  const email = normalize(payload.email);
  const phone = normalize(payload.phone);
  const message = normalize(payload.message);

  if (!name || !subject || !email || !message) {
    return Response.json(
      { message: "Name, subject, email, and description are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return Response.json(
      { message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `Portfolio contact: ${subject}`,
    replyTo: email,
    html: buildEmailHtml({ name, subject, email, phone, message }),
    text: buildEmailText({ name, subject, email, phone, message }),
  });

  if (error) {
    return Response.json(
      { message: error.message ?? "Message could not be sent." },
      { status: 500 },
    );
  }

  return Response.json({ message: "Message sent." });
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml(data: Required<Omit<ContactPayload, "company">>) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1f2a44; line-height: 1.5;">
      <h1 style="margin: 0 0 16px; color: #1f2a44;">New portfolio contact</h1>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Description:</strong></p>
      <div style="white-space: pre-wrap; padding: 14px; border-radius: 8px; background: #f7e6fb;">${escapeHtml(data.message)}</div>
    </div>
  `;
}

function buildEmailText(data: Required<Omit<ContactPayload, "company">>) {
  return [
    "New portfolio contact",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");
}
