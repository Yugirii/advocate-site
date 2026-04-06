import { NextResponse } from "next/server";
import { Resend } from "resend";

type WebsiteInquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Resend API key is not configured." },
      { status: 500 }
    );
  }

  if (!process.env.RESEND_TO) {
    return NextResponse.json(
      { error: "Destination inbox is not configured." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as Partial<WebsiteInquiryPayload>;

  const trimmedMessage = payload.message?.trim() ?? "";

  if (!payload.name || !payload.email || !trimmedMessage) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json(
      { error: "Invalid Email format." },
      { status: 400 }
    );
  }

  if (!/^[A-Za-z\s.'-]+$/.test(payload.name)) {
    return NextResponse.json(
      { error: "Allowed Characters only for name." },
      { status: 400 }
    );
  }

  if (payload.phone && !/^\d+$/.test(payload.phone.trim())) {
    return NextResponse.json(
      { error: "Phone must contain numbers only." },
      { status: 400 }
    );
  }

  if (trimmedMessage.length > 600) {
    return NextResponse.json(
      { error: "Message must be 600 characters or less." },
      { status: 400 }
    );
  }

  const fromAddress =
    process.env.RESEND_FROM ?? "Resend Test <onboarding@resend.dev>";
  const subject = "Website Inquiry";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://advocate-site-f3sh.vercel.app");

  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = escapeHtml(payload.phone?.trim() || "(none)");
  const message = escapeHtml(trimmedMessage);

  const text = [
    "Website Inquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone?.trim() || "(none)"}`,
    "",
    "Message:",
    trimmedMessage,
  ].join("\n");

  const html = `
    <div style="margin:0; padding:32px; background:#f3f3f3; font-family: Arial, Helvetica, sans-serif; color:#1f1f1f;">
      <div style="max-width:720px; margin:0 auto;">
        <div style="text-align:center; margin-bottom:24px;">
          <img src="${baseUrl}/Images/companyCurrentLogo.png" alt="Advocate Tours and Travel Inc." style="width:220px; height:auto; display:inline-block;" />
        </div>
        <div style="background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 12px 28px rgba(0,0,0,0.08);">
          <h1 style="margin:0 0 20px; font-size:24px; font-weight:700;">
            Website Inquiry
          </h1>
          <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
            ${name}<br/>
            ${email}<br/>
            ${phone}
          </p>
          <div style="margin-top:16px; font-size:15px; line-height:1.6;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: process.env.RESEND_TO,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
