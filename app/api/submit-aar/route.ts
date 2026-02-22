import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { Resend } from "resend";
import { PDFReport } from "@/components/PDFReport";
import { EMAIL_RECIPIENTS, EMAIL_FROM, type FormData } from "@/lib/constants";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatDate(dateStr: string): string {
  if (!dateStr) return "Unknown Date";
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`;
}

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.date || !data.pilotName?.trim() || !data.hoistOperator?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: date, pilot name, and hoist operator are required." },
        { status: 400 }
      );
    }

    // Generate PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(
      React.createElement(PDFReport, { data }) as any
    );

    const formattedDate = formatDate(data.date);
    const fileName = `Rescue10_AAR_${data.date}.pdf`;

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_RECIPIENTS,
      subject: `Rescue 10 AAR — ${formattedDate}`,
      text: `An After Action Review has been submitted by ${data.pilotName} for the mission on ${formattedDate}. The full report is attached as a PDF.`,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer.toString("base64"),
          contentType: "application/pdf",
        },
      ],
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit AAR error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
