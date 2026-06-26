import { REUME_ANALYZE_PROMPT } from "@/constant/constant";
import { resume_ai } from "@/lib/AiApi";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {resumedata,jobposition}=await req.json();

    const Final_prompt=REUME_ANALYZE_PROMPT.replace("{{jobposition}}",jobposition).replace("{{resume}}",resumedata)

    try {
        const res=await resume_ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: [
                {
                  role: "user",
                  parts: [{ text: Final_prompt }],
                },
              ],

        })

        console.log(res.candidates[0].content.parts[0].text)
        return NextResponse.json(res.candidates[0].content.parts[0].text.replace("```json"," ").replace("```",""))
    } catch (error) {
        
    }
    
}