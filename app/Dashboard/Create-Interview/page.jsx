"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Loader2 } from "lucide-react";
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
    // console.log(formdata);
  };
  const GoToNext = () => {
    if (
      !formdata.inertviewtype ||
      !formdata.jobRole ||
      !formdata.jobdescription ||
      !formdata.jobduration
    ) {
      console.log("somethign went wron");
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
    <div className=" md:px-30">
      {step < 3 && (
        <div>
          <div className=" flex items-center justify-between">
            <div className=" flex justify-start items-center  gap-y-4">
              <div className=" flex items-center text-start text-2xl font-bold gap-2 my-2 ">
                <Link href={"/Dashboard"} className="  cursor-pointer">
                  <ArrowLeft className="  text-[#9333EA] font-bold " />
                </Link>
                <h2>Create New Interview</h2>
              </div>
            </div>
          </div>

          <Progress value={50 * step} className="" />
        </div>
      )}
      {step == 1 && (
        <FormContainer handlechange={handleformdata} GoToNext={GoToNext} />
      )}
      {step == 2 && (
        <Generatequestion
          questiondata={questions}
          loading={loading}
          finish={handlefinish}
          saveLoading={saveLoading}
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
