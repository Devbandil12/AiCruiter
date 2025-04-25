import { FeedbackHTML } from "@/constant/constant";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req){
    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_EMAIL_API_KEY);
        const {email,name,interviewID,feedback}=await req.json();

        const parsedData=await JSON.parse(feedback)
   
       const finalFeedback=FeedbackHTML(parsedData)




            const data = await resend.emails.send({
              from:"onboarding@resend.dev", // use a verified domain or their demo
              to: email,
              subject: `New message from ${name}`,
              html: finalFeedback,
            });
        
            return NextResponse.json({ success: true, data });

    } catch (error) {
        console.log(error)
    }
}