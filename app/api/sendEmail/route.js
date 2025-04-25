import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req){
    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_EMAIL_API_KEY);
        const {email,name}=await req.json();

    
            const data = await resend.emails.send({
              from:"devband", // use a verified domain or their demo
              to: email,
              subject: `New message from ${name}`,
              html: `<p><strong>Email:</strong> ${email}</p><p>${"hii"}</p>`,
            });
        
            return NextResponse.json({ success: true, data });

    } catch (error) {
        console.log(error)
    }
}