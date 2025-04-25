import { REUME_ANALYZE_PROMPT } from "@/constant/constant";
import { resume_ai } from "@/lib/AiApi";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {resumedata,jobposition}=await req.json();

    const Final_prompt=REUME_ANALYZE_PROMPT.replace("{{jobposition}}",jobposition).replace("{{resume}}",resumedata)

    try {
        const res=await resume_ai.models.generateContent({
            config: {
                responseMimeType: "text/plain",
              },
        
              model: "gemini-2.0-flash-thinking-exp-01-21",
              contents: [
                {
                  role: "user",
                  text: Final_prompt,
                },
              ],

        })

        console.log(res.candidates[0].content.parts[0].text)
        return NextResponse.json(res.candidates[0].content.parts[0].text.replace("```json"," ").replace("```",""))
    } catch (error) {
        
    }
    
}