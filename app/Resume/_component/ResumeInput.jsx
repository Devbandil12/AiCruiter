"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Check, FileUp, FileText, Loader2, AlertCircle, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// A self-contained loading component to avoid path issues.
const SimpleLoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2 text-gray-500">
    <Loader2 className="h-5 w-5 animate-spin" />
    <span>Processing...</span>
  </div>
);

function ResumeInput({ data, setStep }) {
  // --- STATE MANAGEMENT ---
  const [jobPosition, setJobPosition] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState("");

  // --- FILE EXTRACTION LOGIC ---
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setError("");
    setResumeFile(null);
    setResumeText("");

    try {
      // Validate file type and size
      const supportedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!supportedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Please upload a PDF or DOCX.");
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        throw new Error("File is too large. Maximum size is 10MB.");
      }

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        process.env.NEXT_PUBLIC_PDF_URL + "/api/extract-text",
        {
          method: "POST",
          body: formData,
        }
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

  // --- ANALYSIS LOGIC ---
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

    // Simulate a more realistic progress flow
    setProgress(10);
    setAnalysisStatus("Connecting to AI model...");
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : 90));
    }, 800);

    setTimeout(
      () => setAnalysisStatus("Analyzing skills and keywords..."),
      2000
    );
    setTimeout(
      () => setAnalysisStatus("Matching against job description..."),
      4000
    );

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

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8"
      >
        {/* --- HEADER --- */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            AI-Powered Resume Analysis
          </h1>
          <p className="text-gray-500 mt-2">
            Get instant feedback to land your dream job. Let hime cook.
          </p>
        </div>

        {/* --- STEP 1: JOB POSITION --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold">
              1
            </span>
            <h2 className="text-xl font-semibold text-gray-800">
              Your Target Role
            </h2>
          </div>
          <Input
            disabled={isLoading}
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            className="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            placeholder="e.g., Senior Product Manager"
          />
        </div>

        {/* --- STEP 2: UPLOAD RESUME --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold">
              2
            </span>
            <h2 className="text-xl font-semibold text-gray-800">Your Resume</h2>
          </div>

          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors hover:border-purple-500 bg-gray-50">
            <AnimatePresence mode="wait">
              {isExtracting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SimpleLoadingSpinner />
                </motion.div>
              ) : resumeFile ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-left">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {resumeFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
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
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2 text-gray-500"
                >
                  <FileUp className="h-10 w-10" />
                  <p className="font-semibold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm">PDF or DOCX (max 10MB)</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* --- ACTION BUTTON & PROGRESS --- */}
        <div className="space-y-4 pt-4">
          <Button
            onClick={handleAnalyze}
            disabled={!resumeText || !jobPosition || isLoading}
            className="w-full text-lg font-semibold py-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-transform transform hover:scale-102"
          >
            {isAnalyzing ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Analyze My Resume"
            )}
          </Button>

          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 text-center"
              >
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-purple-700 font-medium">
                  {analysisStatus}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 font-medium">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ResumeInput;
