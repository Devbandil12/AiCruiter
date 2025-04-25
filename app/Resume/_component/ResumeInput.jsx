"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import LoadingThreeDotsJumping from "../../loading";
import axios from "axios";
import { toast } from "sonner";

function ResumeInput({ data, setStep }) {
  const [resumeText, setResumeText] = useState("");
  const [jobposition, setJobposition] = useState("");
  const [blockinputs, setBlockinputs] = useState(false);
  const [loadingvalue, setLoadingvalue] = useState(0);
  const [loading, setLoading] = useState(false);
  let analyzedData;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResumeText(JSON.stringify(data.text));
    console.log(JSON.stringify(data.text));
    setLoading(false);
  };
  const handleAnalyze = async () => {
    if (!jobposition || jobposition.length < 5) {
      toast.error("enter job position");
      return;
    }
    setBlockinputs(true);
    setLoading(true);
    const interval = setInterval(() => {
      setLoadingvalue((pre) => pre + 10);

      if (loadingvalue == 90) {
        clearInterval(interval);
      }
    }, 1000);
    if (resumeText) {
      const res = await axios.post("/api/resume/analyze", {
        resumedata: resumeText,
        jobposition: jobposition,
      });
      console.log(res);
      setLoadingvalue((pre) => pre + 10);
      setLoading(false);
      analyzedData = res.data;
      data(JSON.parse(res.data));
      setStep((pre) => pre + 1);
    }
  };

  return (
    <div className=" p-5">
      {loading && <LoadingThreeDotsJumping className="absolute" />}

      <div className="  flex items-center  justify-center flex-col  ">
        <div className=" hidden md:block absolute right-10">
          {
            <Button
              onClick={handleAnalyze}
              disabled={resumeText.length <= 0 || loading}
            >
              Analyze
            </Button>
          }
        </div>
        <h2 className=" text-center text-xl md:text-3xl font-bold bg-gradient-to-b from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Resume Analysis with AI
        </h2>
        <p className=" text-center">
          Upload your resume to get expert suggestions and improve the existing
          one
        </p>
      </div>
      <div className="mt-10 w-full relative flex items-start justify-center flex-col gap-y-1">
        <h2>
          <strong>Enter you Job Position</strong>
        </h2>
        <Input
          disabled={blockinputs}
          value={jobposition}
          onChange={(e) => setJobposition(e.target.value)}
          className=" border-primary text-zinc-800"
          placeholder=" frontend developer/ HR/ Data Analyst"
        />
        <div className=" mt-5 w-full  md:w-auto hover:shadow-md border-dashed border-2 border-gray-400 rounded-2xl p-3 flex-col md:flex-row flex items-center justify-center relative gap-2">
          <span className=" w-10 h-10   bg-[#dec0f9] p-2 flex items-center justify-center rounded-full">
            {" "}
            <Upload className=" text-primary" size={30} />
          </span>
          <span className=" text-center">
            <h2 className=" text-xl font-semibold">Upload resume</h2>
            <p>Select resume to be analyzed</p>
          </span>
          <Input
            disabled={blockinputs}
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className=" absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleUpload}
          />
        </div>
        <div className=" block md:hidden  ">
          {
            <Button
              onClick={handleAnalyze}
              className="  ml-[9rem] mt-10"
              disabled={resumeText.length <= 0 || loading}
            >
              Analyze
            </Button>
          }
        </div>
      </div>
      {loadingvalue > 0 && <Progress className="mt-5" value={loadingvalue} />}
    </div>
  );
}

export default ResumeInput;
