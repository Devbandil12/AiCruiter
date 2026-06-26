"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  FileUp,
  FileText,
  Loader2,
  AlertCircle,
  X,
  Briefcase,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SimpleLoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2 text-purple-500">
    <Loader2 className="h-5 w-5 animate-spin" />
    <span className="text-sm font-medium">Reading your resume...</span>
  </div>
);

function ResumeInput({ data, setStep }) {
  const [jobPosition, setJobPosition] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setError("");
    setResumeFile(null);
    setResumeText("");

    try {
      const supportedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!supportedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Please upload a PDF or DOCX.");
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File is too large. Maximum size is 10MB.");
      }

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        process.env.NEXT_PUBLIC_PDF_URL + "/api/extract-text",
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to extract text from resume."
        );
      }

      const result = await response.json();
      setResumeFile(file);
      setResumeText(result.text);
      toast.success("Resume ready for analysis!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jobPosition || jobPosition.length < 3) {
      toast.error("Please enter a valid job position.");
      return;
    }
    if (!resumeText) {
      toast.error("Please upload a resume first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setProgress(10);
    setAnalysisStatus("Connecting to AI model...");

    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : 90));
    }, 800);

    setTimeout(() => setAnalysisStatus("Analyzing skills and keywords..."), 2000);
    setTimeout(() => setAnalysisStatus("Matching against job description..."), 4000);

    try {
      const res = await axios.post("/api/resume/analyze", {
        resumedata: resumeText,
        jobposition: jobPosition,
      });

      clearInterval(timer);
      setProgress(100);
      setAnalysisStatus("Analysis complete!");
      toast.success("Your report is ready!");
      data(JSON.parse(res.data));
      setStep((pre) => pre + 1);
    } catch (err) {
      clearInterval(timer);
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to analyze resume.";
      setError(errorMessage);
      toast.error(errorMessage);
      setProgress(0);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isLoading = isExtracting || isAnalyzing;
  const step1Done = jobPosition.length >= 3;
  const step2Done = !!resumeFile;

  return (
    <div className="relative min-h-screen  from-slate-50 via-purple-50/30 to-indigo-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/40 flex items-center justify-center p-4 overflow-hidden">

      {/* Blurred gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-300/30 dark:bg-purple-900/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-300/30 dark:bg-indigo-900/20 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-1/4 h-56 w-56 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-2xl" />

      {/* Left feature chips — xl+ only */}
      <div className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
        {[
          { icon: <Sparkles className="w-4 h-4 text-purple-500" />, text: "AI-Powered Analysis" },
          { icon: <FileText className="w-4 h-4 text-indigo-500" />, text: "Smart PDF Parsing" },
          { icon: <Briefcase className="w-4 h-4 text-purple-500" />, text: "Job Role Matching" },
          { icon: <Check className="w-4 h-4 text-green-500" />, text: "ATS Compatibility" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm border border-purple-100 dark:border-white/10 rounded-full px-4 py-2 shadow-sm opacity-80">
            {item.icon}
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Right "what you get" card — xl+ only */}
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-80">
        <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm border border-purple-100/60 dark:border-white/10 rounded-2xl p-5 shadow-sm w-52">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">What you get</p>
          {[
            "ATS compatibility score",
            "Grammar & clarity check",
            "Structure analysis",
            "Keyword relevance",
            "Improvement tips",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-lg shadow-purple-200 mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Resume Analyzer
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Get an ATS score, grammar check, and improvement tips in seconds.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl  shadow-purple-100/40 dark:shadow-purple-900/20 border border-purple-100/60 dark:border-white/10 p-4 sm:p-6 md:p-8 space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
                  step1Done
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {step1Done ? <Check className="w-4 h-4" /> : "1"}
              </span>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Target Role
              </h2>
            </div>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                disabled={isLoading}
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                className="pl-9 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg"
                placeholder="e.g., Senior Product Manager"
              />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
                  step2Done
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {step2Done ? <Check className="w-4 h-4" /> : "2"}
              </span>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Upload Resume
              </h2>
              <span className="text-xs text-gray-400 ml-auto">
                PDF or DOCX · max 10MB
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isExtracting ? (
                /* Loading — no file input, nothing is clickable */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/30 p-8 flex items-center justify-center"
                >
                  <SimpleLoadingSpinner />
                </motion.div>
              ) : resumeFile ? (
                /* File loaded — no file input, X button is fully reachable */
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-purple-200 bg-purple-50/30 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(resumeFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setResumeFile(null);
                      setResumeText("");
                    }}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                /* Empty — label wraps the hidden input so the whole zone is clickable */
                <motion.label
                  key="upload"
                  htmlFor="resume-upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 group p-8 flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                    <FileUp className="h-6 w-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <p className="font-medium text-sm text-gray-600">
                    Click to upload or drag & drop
                  </p>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.docx"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                </motion.label>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-1">
            <Button
              onClick={handleAnalyze}
              disabled={!step2Done || !step1Done || isLoading}
              className="w-full text-base font-semibold py-5 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-xl shadow-md shadow-purple-200/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Analyze My Resume
                </span>
              )}
            </Button>

            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <Progress value={progress} className="h-1.5" />
                  <p className="text-xs text-center text-purple-600 font-medium">
                    {analysisStatus}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResumeInput;
