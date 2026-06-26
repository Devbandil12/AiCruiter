"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import FormContainer from "./_component/FormContainer";
import Generatequestion from "./_component/Generatequestion";
import { toast } from "sonner";
import axios from "axios";
import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { useUser } from "@clerk/nextjs";

import Interviewlink from "./_component/InterviewLink";

const STEPS = [
  { num: 1, label: "Details" },
  { num: 2, label: "Review Questions" },
  { num: 3, label: "Share Link" },
];

function CreateInterview() {
  const [formdata, setFormdata] = useState();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [interviewID, setInterviewID] = useState();
  const [error, setError] = useState("");

  const { user } = useUser();

  const handleformdata = (field, value) => {
    setFormdata((pre) => ({ ...pre, [field]: value }));
  };

  const GoToNext = () => {
    if (
      !formdata.inertviewtype ||
      !formdata.jobRole ||
      !formdata.jobdescription ||
      !formdata.jobduration
    ) {
      toast.error("Fill al the info");
      return;
    }
    Generatequestions();
    setStep((pre) => pre + 1);
  };

  const Generatequestions = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/GenerateQuestion", { ...formdata });
      const final = res.data.replace("```json", " ").replace("```", " ");
      const Final_data = await JSON.parse(final);
      setQuestions(Final_data.interviewquestion);
      setLoading(false);
    } catch (error) {
      setError("something went wrong please try again....");
      toast("something went wrong please try again....");
      setLoading(false);
      console.log(error);
    }
  };

  const handlefinish = async () => {
    try {
      setSaveLoading(true);
      const res = await db
        .insert(interviewDetailsTable)
        .values({
          ...formdata,
          questionlist: questions,
          useremail: user?.primaryEmailAddress.emailAddress,
        })
        .returning({ interviewID: interviewDetailsTable.id });
      setSaveLoading(false);
      toast.success("interview created successfully");
      setInterviewID(res[0].interviewID);
      setStep((pre) => pre + 1);
    } catch (error) {
      setSaveLoading(false);
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-28 pb-10">
      {step < 3 && (
        <div className="mb-6">
          {/* Header */}
          <div className="flex items-center gap-2 mt-4 mb-6">
            <Link href="/Dashboard" className="cursor-pointer">
              <ArrowLeft className="text-purple-600 w-5 h-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Interview</h2>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-5">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${step > s.num
                        ? "bg-purple-600 text-white"
                        : step === s.num
                        ? "bg-purple-600 text-white ring-4 ring-purple-100"
                        : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium whitespace-nowrap transition-colors ${
                      step === s.num ? "text-purple-600" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-20 mb-5 mx-2 rounded-full transition-all duration-300 ${
                      step > s.num ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <Progress value={(step / 3) * 100} className="h-1.5 rounded-full" />
        </div>
      )}

      {step == 1 && <FormContainer handlechange={handleformdata} GoToNext={GoToNext} />}
      {step == 2 && (
        <Generatequestion
          questiondata={questions}
          loading={loading}
          finish={handlefinish}
          saveLoading={saveLoading}
          onRetry={Generatequestions}
        />
      )}
      {step == 3 && (
        <Interviewlink
          interviewid={interviewID}
          formdata={formdata}
          questions={questions}
        />
      )}
    </div>
  );
}

export default CreateInterview;
