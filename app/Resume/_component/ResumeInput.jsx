"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Check, Upload } from "lucide-react";
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
    const res = await fetch(process.env.NEXT_PUBLIC_PDF_URL + "getdata", {
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
        <div className=" flex items-center justify-center w-full">
          <div className=" mt-5 w-full p-10  md:w-auto hover:shadow-md border-dashed border-2 border-primary rounded-2xl flex-col flex items-center justify-center relative gap-2">
            {loading ? (
              <LoadingThreeDotsJumping className="absolute" />
            ) : (
              <span
                className={` w-10 h-10   ${resumeText?.length > 0 ? "bg-green-500 text-white" : "bg-[#dec0f9]"} p-2 flex items-center justify-center rounded-full`}
              >
                {" "}
                {resumeText?.length > 0 ? (
                  <Check />
                ) : (
                  <Upload className=" text-primary" size={30} />
                )}
              </span>
            )}
            <span className=" text-center">
              <h2 className=" text-xl font-semibold">
                {resumeText?.length > 0 ? "Resume uploaded" : "Upload resume"}
              </h2>
              <p>Select resume to be analyzed</p>
            </span>
            {!loading && (
              <Input
                disabled={blockinputs || loading || resumeText?.length > 0}
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className={`${resumeText?.length > 0 && "hidden"} absolute h-full w-full cursor-pointer opacity-0`}
                onChange={handleUpload}
              />
            )}
          </div>
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
