"use client";
import { interviewcontext } from "@/context/InterviewDataContet";
import { useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, PhoneCall, PhoneOff } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AlertConfirm from "./_component/AlertConfirm";
import { toast } from "sonner";
import axios from "axios";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { feedbacktable } from "@/db/schema";
import Timer from "./_component/Timer";

function InterviewPage() {
  const { user } = useUser();
  const [isRunning, setIsRunning] = useState(false);
  const { interviewinfo, name, setFeedback, feedback } = useContext(interviewcontext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState("null");
  const [convo, setConvo] = useState();
  const [callStatus, setCallStatus] = useState("idle"); // idle | connecting | connected | ended
  const [micEnabled, setMicEnabled] = useState(true);

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    let vapi = vapiRef.current;
    let newar = "";

    vapi.on("message", (m) => {
      if (m?.conversation) {
        newar = JSON.stringify(m?.conversation);
        setConvo(newar);
      }
    });

    vapi.on("call-start", () => {
      setCallStatus("connected");
      toast.success("Call connected...");
    });
    vapi.on("speech-start", () => setActiveUser("false"));
    vapi.on("speech-end", () => setActiveUser("true"));
    vapi.on("call-end", () => {
      setConvo(newar);
      setCallStatus("ended");
      toast.message("Call ended.");
      generateFeedback(newar);
    });
  }, []);

  const setInDB = async (feedbackData) => {
    try {
      await db.insert(feedbacktable).values({
        interviewid: interviewinfo?.id,
        useremail: user?.primaryEmailAddress.emailAddress,
        feedback: feedbackData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const generateFeedback = async (text) => {
    if (!text) return;
    try {
      const res = await axios.post("/api/ai-feedback", {
        convo: text,
        email: user?.primaryEmailAddress.emailAddress,
        name: user?.fullName,
      });
      const finalmessage = res?.data.replace("```json", " ").replace("```", "");
      setFeedback(finalmessage);
      setInDB(finalmessage);
    } catch (error) {
      console.error("Feedback error:", error);
    }
  };

  const startCall = () => {
    if (!interviewinfo || !vapiRef.current || !user) return;
    setIsRunning(true);
    setCallStatus("connecting");

    let questions = "";
    interviewinfo.questionlist.map((q) => (questions += q.question + ","));

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${name || "user"}, how are you? Ready for your interview on ${interviewinfo.jobRole}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "11labs", voiceId: "paula" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Begin with: "Hey there! Welcome to your ${interviewinfo.jobRole} interview. Let's get started with a few questions!"
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
    if (vapiRef.current) vapiRef.current.stop();
    setTimeout(() => {
      redirect("/interview/" + interviewinfo.id + "/finish");
    }, 1500);
  };

  const toggleMic = () => {
    if (vapiRef.current) {
      const muted = vapiRef.current.isMuted();
      vapiRef.current.setMuted(!muted);
      setMicEnabled(muted);
    }
  };

  const getSpeakingStatus = () => {
    if (callStatus === "idle") return "Ready to begin your interview";
    if (callStatus === "connecting") return "Connecting to AI interviewer...";
    if (callStatus === "ended") return "Generating your feedback...";
    if (activeUser === "false") return "ALICE is speaking...";
    if (activeUser === "true") return "Your turn to speak";
    return "Interview in progress";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Timer + live indicator */}
        <div className="flex items-center gap-3">
          <Timer
            limit={interviewinfo?.jobduration}
            setIsRunning={setIsRunning}
            isRunning={isRunning}
            compact
          />
          {callStatus === "connected" && (
            <span className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Status text */}
        <p className="text-slate-400 text-xs tracking-widest uppercase font-medium">
          {getSpeakingStatus()}
        </p>

        {/* Avatar cards */}
        <div className="flex flex-col md:flex-row gap-5 w-full max-w-2xl">
          {/* AI card */}
          <div
            className={`flex-1 rounded-2xl border bg-slate-900 flex flex-col items-center justify-center py-12 gap-4 transition-all duration-500 ${
              activeUser === "false"
                ? "border-primary shadow-lg shadow-primary/20"
                : "border-slate-800"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {activeUser === "false" && (
                <>
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping scale-125" />
                  <span
                    className="absolute inset-0 rounded-full bg-primary/15 animate-ping scale-150"
                    style={{ animationDelay: "150ms" }}
                  />
                </>
              )}
              <img
                src="/aigirl.webp"
                alt="AI"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary relative z-10"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white">ALICE</h3>
              <p className="text-xs text-slate-500">AI Interviewer</p>
            </div>
            {/* Voice wave bars */}
            <div className="flex gap-1 items-end h-6">
              {[4, 7, 10, 7, 4, 8, 5].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    activeUser === "false"
                      ? "bg-primary animate-bounce"
                      : "bg-slate-700"
                  }`}
                  style={{
                    height: activeUser === "false" ? `${h}px` : "4px",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* User card */}
          <div
            className={`flex-1 rounded-2xl border bg-slate-900 flex flex-col items-center justify-center py-12 gap-4 transition-all duration-500 ${
              activeUser === "true"
                ? "border-green-500 shadow-lg shadow-green-500/20"
                : "border-slate-800"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {activeUser === "true" && (
                <>
                  <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping scale-125" />
                  <span
                    className="absolute inset-0 rounded-full bg-green-500/15 animate-ping scale-150"
                    style={{ animationDelay: "150ms" }}
                  />
                </>
              )}
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white border-2 border-primary relative z-10">
                {user?.fullName?.[0] ?? name?.[0] ?? "U"}
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white">{user?.fullName || name || "You"}</h3>
              <p className="text-xs text-slate-500">Candidate</p>
            </div>
            {/* Voice wave bars */}
            <div className="flex gap-1 items-end h-6">
              {[5, 8, 5, 10, 6, 9, 4].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    activeUser === "true"
                      ? "bg-green-500 animate-bounce"
                      : "bg-slate-700"
                  }`}
                  style={{
                    height: activeUser === "true" ? `${h}px` : "4px",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-2">
          {callStatus === "idle" ? (
            <button
              onClick={startCall}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/30"
            >
              <PhoneCall size={18} />
              Start Interview
            </button>
          ) : (
            <>
              <button
                onClick={toggleMic}
                title={micEnabled ? "Mute microphone" : "Unmute microphone"}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  micEnabled
                    ? "border-slate-600 text-slate-300 hover:border-slate-400"
                    : "border-red-500 bg-red-500/20 text-red-400"
                }`}
              >
                {micEnabled ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <AlertConfirm cutcall={handleStopCall}>
                <button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-600/40 transition-all hover:scale-105">
                  <PhoneOff size={20} />
                </button>
              </AlertConfirm>
            </>
          )}
        </div>

        {callStatus === "idle" && (
          <p className="text-slate-600 text-xs">
            Make sure your microphone is enabled before starting
          </p>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
