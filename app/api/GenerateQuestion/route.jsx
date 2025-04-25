import { Prompt } from "@/constant/constant";
import { ai } from "@/lib/AiApi";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobRole, jobdescription, jobduration, inertviewtype } =
      await req.json();

    const Final_Prompt = Prompt.replace("{{jobposition}}", jobRole)
      .replace("{{jobdecription}}", jobdescription)
      .replace("{{interviewduration}}", jobduration)
      .replace("{{interviewtype}}", inertviewtype);

    const res = await ai.models.generateContent({
      config: {
        responseMimeType: "text/plain",
      },

      model: "gemini-2.0-flash-thinking-exp-01-21",
      contents: [
        {
          role: "user",
          text: Final_Prompt,
        },
      ],
    });

    return NextResponse.json(
      res.candidates[0].content.parts[0].text
        .replace("```json", " ")
        .replace("```", " ")
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
