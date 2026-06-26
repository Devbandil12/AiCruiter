import { FeedbackHTML } from "@/constant/constant";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, name, feedback } = await req.json();

    const parsedData = JSON.parse(feedback);
    const finalFeedback = FeedbackHTML(parsedData);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const data = await transporter.sendMail({
      from: `"AiCruiter" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: email,
      subject: `Interview Feedback for ${name}`,
      html: finalFeedback,
    });

    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
