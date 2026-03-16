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

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const payload = (await request.json()) as Partial<InquiryPayload>;

  if (!payload.email || !payload.name || !payload.departure || !payload.returnDate) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const fromAddress = process.env.RESEND_FROM ?? "Resend Test <onboarding@resend.dev>";
  const subject = `Destination Inquiry - ${payload.destination ?? "Unknown"}`;

  const text = [
    `Destination: ${payload.destination ?? "Unknown"}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Departure: ${payload.departure}`,
    `Return: ${payload.returnDate}`,
    `Adults: ${payload.adults ?? 0}`,
    `Children: ${payload.children ?? 0}`,
    `Infants: ${payload.infants ?? 0}`,
    `Additional Inquiries:`,
    payload.additionalInquiries?.trim() || "(none)",
  ].join("\n");

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: process.env.RESEND_TO,
    reply_to: payload.email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
