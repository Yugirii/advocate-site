import { NextResponse } from "next/server";
import { Resend } from "resend";

type InquiryPayload = {
  destination: string;
  email: string;
  name: string;
  departure: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  additionalInquiries: string;
};

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

  const resend = new Resend(process.env.RESEND_API_KEY);

  const payload = (await request.json()) as Partial<InquiryPayload>;

  if (
    !payload.email ||
    !payload.name ||
    !payload.departure ||
    !payload.returnDate
  ) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if ((payload.adults ?? 0) < 1) {
    return NextResponse.json(
      { error: "At least 1 adult is required." },
      { status: 400 }
    );
  }

  if ((payload.additionalInquiries?.trim().length ?? 0) > 600) {
    return NextResponse.json(
      { error: "Message must be 600 characters or less." },
      { status: 400 }
    );
  }

  const fromAddress = process.env.RESEND_FROM ?? "Resend Test <onboarding@resend.dev>";
  const subject = `Destination Inquiry - ${payload.destination ?? "Unknown"}`;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://advocate-site-f3sh.vercel.app");

  const destination = escapeHtml(payload.destination ?? "Unknown");
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const departure = escapeHtml(payload.departure);
  const returnDate = escapeHtml(payload.returnDate);
  const adults = String(payload.adults ?? 0);
  const children = String(payload.children ?? 0);
  const infants = String(payload.infants ?? 0);
  const message = escapeHtml(payload.additionalInquiries?.trim() || "(none)");

  const text = [
    `Destination: ${payload.destination ?? "Unknown"}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Travel date: ${payload.departure} -> ${payload.returnDate}`,
    `Adults: ${payload.adults ?? 0}`,
    `Children: ${payload.children ?? 0}`,
    `Infants: ${payload.infants ?? 0}`,
    `Message:`,
    payload.additionalInquiries?.trim() || "(none)",
  ].join("\n");

  const html = `
    <div style="margin:0; padding:32px; background:#f3f3f3; font-family: Arial, Helvetica, sans-serif; color:#1f1f1f;">
      <div style="max-width:720px; margin:0 auto;">
        <div style="text-align:center; margin-bottom:20px;">
          <img src="${baseUrl}/Images/companyCurrentLogo.png" alt="Advocate Tours and Travel Inc." style="width:220px; height:auto; display:inline-block;" />
        </div>
        <div style="background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 12px 28px rgba(0,0,0,0.08);">
          <h1 style="margin:0 0 20px; font-size:24px; font-weight:700;">
            Destination Inquiry for ${destination}
          </h1>
          <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
            <strong>${name}</strong><br/>
            ${email}
          </p>
          <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
            Travel date: ${departure} → ${returnDate}<br/>
            Adults: ${adults}<br/>
            Children: ${children}<br/>
            Infant: ${infants}
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
