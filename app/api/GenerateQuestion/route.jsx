import { Prompt } from "@/constant/constant";
import { ai } from "@/lib/AiApi";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { jobRole, jobdescription, jobduration, inertviewtype } =
      await req.json();
    
    const Final_Prompt = Prompt.replace("{{jobposition}}", jobRole)
      .replace("{{jobdecription}}", jobdescription)
      .replace("{{interviewduration}}", jobduration)
      .replace("{{interviewtype}}", inertviewtype);

    let res 

    try {
     res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "text/plain",
      },
      contents: [
        {
          role: "user",
          parts: [{ text: Final_Prompt }],
        },
      ],
    });
    } catch (error) {
      console.log("Error generating content:", error);
    }
    console.log(res.candidates[0].content);
    console.log(res.candidates[0].content.parts[0]);
    console.log(res.candidates[0].content.parts[0].text);

    const final_data = res.candidates[0].content.parts[0].text;

    return NextResponse.json(final_data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
