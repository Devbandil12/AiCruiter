"use client";
import { interviewcontext } from "@/context/InterviewDataContet";
import { useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneCall, Timer } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AlertConfirm from "./_component/AlertConfirm";
import { toast } from "sonner";
import axios from "axios";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { feedbacktable } from "@/db/schema";

function InterviewPage() {
  const { user } = useUser();
  const { interviewinfo } = useContext(interviewcontext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState("null");
  const [convo, setConvo] = useState();

  // Initialize Vapi and event listeners once

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

    let vapi = vapiRef.current;
    let newar = "";
    vapi.on("message", (m) => {
      if (m?.conversation) {
        newar = JSON.stringify(m?.conversation);
        console.log(newar);
        setConvo(newar); // Update state
      }
    });

    vapi.on("call-start", () => toast.success("Call connected..."));
    vapi.on("speech-start", () => setActiveUser("false"));
    vapi.on("speech-end", () => setActiveUser("true"));
    vapi.on("call-end", () => {
      setConvo(newar);
      toast.message("Call ended.");
      generateFeedback(newar);
    });
  }, []);

  const setInDB = async (feedback) => {
    try {
      await db.insert(feedbacktable).values({
        interviewid: interviewinfo?.id,
        useremail: user?.primaryEmailAddress.emailAddress,
        feedback: feedback,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const generateFeedback = async (text) => {
    console.log(text);
    if (!text) return;
    try {
      const res = await axios.post("/api/ai-feedback", {
        convo: text,
        email: user?.primaryEmailAddress.emailAddress,
        name: user?.fullName,
      });
      console.log("Feedback:", res?.data || res);
      const finalmessage = res?.data.replace("```json", " ").replace("```", "");
      setInDB(finalmessage);
    } catch (error) {
      console.error("Feedback error:", error);
    }
  };

  const startCall = () => {
    if (!interviewinfo || !vapiRef.current || !user) return;

    let questions;
    interviewinfo.questionlist.map((q) => (questions += q.question + ","));

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${user.fullName}, how are you? Ready for your interview on ${interviewinfo.jobRole}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Begin with: "Hey there! Welcome to your ${interviewinfo.jobRole} interview. Let’s get started with a few questions!"
Ask questions one at a time from the list below and wait for the user's response:
Questions: ${questions}
Encourage, guide, and give positive feedback.
Wrap up after 5-7 questions with a summary and motivation.
`.trim(),
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);
  };

  const handleStopCall = async () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setTimeout(() => {
      redirect("/interview/" + interviewinfo.id + "/finish");
    }, 1500);

    // Wait for the final message to arrive

    // 1.5 seconds should be enough to catch the final message
  };

  return (
    <div className="h-screen px-20 py-10">
      {/* Timer */}
      <div className="mb-3 flex items-center justify-center">
        <h2
          onClick={startCall}
          className="cursor-pointer hover:scale-105 rounded-2xl p-1 bg-gradient-to-br from-primary via-indigo-500 to-slate-800 text-white font-semibold flex items-center"
        >
          <Timer /> 00:00:00
        </h2>
      </div>

      {/* Call UI Blocks */}
      <div className="flex items-center justify-center gap-5">
        {/* AI */}
        <div className="w-1/2 h-[20rem] rounded-3xl shadow-lg border-2 border-primary bg-gray-50 flex items-center justify-center">
          <div>
            <div className="relative w-16 h-16 rounded-full border-2">
              {activeUser === "false" && (
                <span className="absolute inset-0 rounded-full bg-primary animate-ping"></span>
              )}
              <img
                src="/aigirl.webp"
                alt="AI"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-center font-semibold mt-2">ALICE</h2>
          </div>
        </div>

        {/* User */}
        <div className="w-1/2 h-[20rem] rounded-3xl shadow-lg border-2 border-primary bg-gray-50 flex items-center justify-center">
          <div>
            <div className="relative flex items-center justify-center text-xl font-bold w-16 h-16 rounded-full border-2 bg-primary text-white">
              {activeUser === "true" && (
                <span className="absolute inset-0 rounded-full bg-primary animate-ping"></span>
              )}
              {user?.fullName?.[0]}
            </div>
            <h2 className="text-center font-semibold mt-2">{user?.fullName}</h2>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary">
          <Mic className="text-primary" />
        </span>

        <AlertConfirm cutcall={handleStopCall}>
          <span className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white">
            <PhoneCall />
          </span>
        </AlertConfirm>
      </div>
    </div>
  );
}

export default InterviewPage;
