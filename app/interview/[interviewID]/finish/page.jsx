"use client";
import { Button } from "@/components/ui/button";
import { interviewcontext } from "@/context/InterviewDataContet";
import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import { CheckCircle2, Clock, Mail, Stars } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function Page() {
  const { user } = useUser();
  const { interviewID } = useParams();
  const { feedback, interviewinfo } = useContext(interviewcontext);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const updateThestatus = async () => {
    await db
      .update(interviewDetailsTable)
      .set({ completed: "true" })
      .where(eq(interviewDetailsTable.id, interviewID));
  };

  useEffect(() => {
    updateThestatus();
  }, [interviewID]);

  const handlesendreport = async () => {
    if (sending || sent) return;
    setSending(true);
    try {
      await axios.post("/api/sendEmail", {
        email: user?.primaryEmailAddress.emailAddress,
        interviewID: interviewID,
        name: user?.fullName,
        feedback: feedback,
      });
      setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          <Stars className="text-primary" size={20} />
          <span className="font-black text-primary text-xl">AIcruiter</span>
        </div>

        {/* Success icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Interview Completed!
        </h1>
        <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
          Great job! Your responses have been recorded and our AI is generating
          your personalized feedback report.
        </p>

        {/* What's next */}
        <div className="bg-purple-50 rounded-2xl p-5 mb-6 text-left">
          <h3 className="font-semibold text-slate-700 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p className="text-sm text-slate-600">
                AI analyses your conversation and generates a detailed feedback
                report with scores and suggestions.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p className="text-sm text-slate-600">
                Report is sent to{" "}
                <strong className="text-slate-700">
                  {user?.primaryEmailAddress.emailAddress}
                </strong>
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={12} className="text-primary" />
              </div>
              <p className="text-sm text-slate-600">
                Expect a response within{" "}
                <strong className="text-slate-700">2–3 business days</strong>
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handlesendreport}
          disabled={sending || sent}
          className="w-full flex items-center justify-center gap-2 h-11 rounded-xl"
        >
          {sent ? (
            <>
              <CheckCircle2 size={18} />
              Report Sent!
            </>
          ) : (
            <>
              <Mail size={18} />
              {sending ? "Sending..." : "Send me the Report"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Page;
