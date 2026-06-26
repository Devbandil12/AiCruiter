"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { interviewcontext } from "@/context/InterviewDataContet";
import {
  Camera,
  CheckCircle2,
  Circle,
  Mic,
  Stars,
  Video,
  VolumeX,
  Wifi,
} from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LoadingThreeDotsJumping from "@/app/loading";

const CHECKLIST = [
  { icon: Camera, label: "Camera is working" },
  { icon: Mic, label: "Microphone is enabled" },
  { icon: Wifi, label: "Stable internet connection" },
  { icon: VolumeX, label: "Found a quiet environment" },
];

function Page() {
  const { interviewID } = useParams();
  const [checks, setChecks] = useState([false, false, false, false]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { interviewinfo, fetchdata, setName, name } = useContext(interviewcontext);

  useEffect(() => {
    fetchdata(interviewID).finally(() => setFetchLoading(false));
  }, [interviewID]);

  const toggleCheck = (i) => {
    setChecks((prev) => prev.map((c, idx) => (idx === i ? !c : c)));
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex flex-col items-center justify-center gap-4">
        <LoadingThreeDotsJumping />
        <p className="text-sm text-gray-400 font-medium">Loading interview details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white border border-purple-100 shadow-xl rounded-3xl p-8 w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <Stars className="text-primary" size={20} />
          <span className="font-black text-primary text-xl">AIcruiter</span>
        </div>

        {/* Job info */}
        {interviewinfo && (
          <div className="bg-purple-50 rounded-2xl p-4 mb-5">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Interview for
            </p>
            <h2 className="text-lg font-bold text-slate-800">
              {interviewinfo.jobRole}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {interviewinfo.interviewtype && (
                <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-purple-100 text-slate-500 capitalize">
                  {interviewinfo.interviewtype}
                </span>
              )}
              {interviewinfo.jobduration && (
                <span className="text-xs bg-white px-2.5 py-1 rounded-full border border-purple-100 text-slate-500">
                  {interviewinfo.jobduration} min
                </span>
              )}
            </div>
          </div>
        )}

        {/* Name input */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
            Your Full Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="border-2 border-purple-200 focus:border-primary rounded-xl h-11"
          />
        </div>

        {/* Checklist */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Pre-interview checklist
          </p>
          <div className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  checks[i]
                    ? "bg-green-50 border-green-200"
                    : "bg-slate-50 border-slate-200 hover:border-purple-200"
                }`}
              >
                {checks[i] ? (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-300 shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    checks[i] ? "text-green-700 font-medium" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={() => redirect("/interview/" + interviewID + "/start")}
          disabled={name.length < 3}
          className="w-full flex items-center justify-center gap-2 h-11 rounded-xl"
        >
          <Video size={18} />
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Page;
