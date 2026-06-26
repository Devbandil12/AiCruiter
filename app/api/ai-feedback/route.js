import { FEEDBACK_PROMPT } from "@/constant/constant"
import { feedback_ai } from "@/lib/AiApi";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const {convo,email,name}=await req.json()
        console.log({"from server":convo})

    const feedbackprompt=FEEDBACK_PROMPT.replace("{{conversation}}",JSON.stringify(convo))

     const res = await feedback_ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: feedbackprompt }],
            },
          ],
        });
        console.log(res.candidates[0].content.parts[0].text)
       
          
        

        return NextResponse.json( res.candidates[0].content.parts[0].text
            .replace("```json", " ")
            .replace("```", " "))
    } catch (error) {
          
        return NextResponse.json("something went wrong !")
    }


    
}