"use client";
import React, { useState } from "react";
import ResumeInput from "./_component/ResumeInput";
import ResumeScore from "./_component/resumeScore";
import { Toaster } from "sonner";
function ResumeUploader() {
  const [scoredata, setScoredata] = useState();
  const [step, setStep] = useState(0);
  return (
    <div className=" shadow-lg md:p-10 ">
      <Toaster />
      {step == 0 && <ResumeInput data={setScoredata} setStep={setStep} />}
      {step == 1 && <ResumeScore data={scoredata} />}
    </div>
  );
}

export default ResumeUploader;
