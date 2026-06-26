"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ImprovementPopup from "./popup";
import { ChevronRight } from "lucide-react";

function ResumeScore({ data }) {
  const [popup, setPopup] = useState(false);
  const [popupdetails, setPopupdetails] = useState();

  const handledetailpopup = (details) => {
    setPopupdetails(details);
    setPopup(true);
  };

  const suggestion = data?.result[0].replacements;

  return (
    <div className="relative min-h-screen  from-slate-50 via-purple-50/30 to-indigo-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/40 px-4 py-10 overflow-hidden">
      {popup && <ImprovementPopup data={popupdetails} onClose={setPopup} />}

      {/* Blurred gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-300/25 dark:bg-purple-900/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-300/25 dark:bg-indigo-900/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-full bg-pink-200/15 dark:bg-pink-900/10 blur-3xl" />

      {/* Decorative floating score hint — right side, lg+ */}
      <div className="pointer-events-none absolute right-6 top-1/4 hidden lg:flex flex-col gap-3 opacity-60">
        {[
          { label: "ATS", color: "text-emerald-500", bar: "bg-emerald-400", w: "w-20" },
          { label: "Grammar", color: "text-blue-500", bar: "bg-blue-400", w: "w-14" },
          { label: "Structure", color: "text-purple-500", bar: "bg-purple-400", w: "w-16" },
          { label: "Relevance", color: "text-amber-500", bar: "bg-amber-400", w: "w-12" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${item.color} w-16 text-right`}>{item.label}</span>
            <div className="h-1.5 w-24 rounded-full bg-gray-200/60 dark:bg-gray-700/60 overflow-hidden">
              <div className={`h-full ${item.bar} rounded-full ${item.w}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative tip card — left side, lg+ */}
      <div className="pointer-events-none absolute left-6 bottom-1/4 hidden lg:block opacity-60">
        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100 dark:border-white/10 rounded-2xl p-4 w-44 shadow-sm">
          <p className="text-xs font-semibold text-purple-500 mb-2">Pro Tip</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Tailor keywords to each job posting to boost your ATS score.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Your Resume Report
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Based on AI analysis and ATS compatibility
          </p>
        </div>

        {/* Score Breakdown Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-purple-100/40 dark:shadow-purple-900/20 border border-purple-100/60 dark:border-white/10 p-4 sm:p-6 md:p-8">
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Score Breakdown
          </h2>
          <ResumeCircularScores data={data} />
        </div>

        {/* Improvements Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-purple-100/40 dark:shadow-purple-900/20 border border-purple-100/60 dark:border-white/10 p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Areas of Improvement
            </h2>
            <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2.5 py-1 rounded-full">
              {suggestion?.length || 0} suggestions
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {suggestion?.map((val, ind) => (
              <motion.button
                key={ind}
                onClick={() => handledetailpopup(val)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between p-4 rounded-xl border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 hover:border-purple-300 dark:hover:border-purple-700 transition-all text-left group cursor-pointer"
              >
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  {val.area}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0 transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeScore;

// ─── Circular Score Components ───────────────────────────────────────────────

const radius = 52;
const stroke = 8;
const normalizedRadius = radius - stroke * 0.5;
const circumference = 2 * Math.PI * normalizedRadius;

const CircularScore = ({ label, score, color }) => {
  // Compute target offset directly — no state, no useEffect.
  // Framer Motion animates from `initial` (empty) to `animate` (filled) on mount.
  const safeScore = Math.min(100, Math.max(0, isNaN(score) ? 0 : score));
  const targetOffset = circumference - (safeScore / 100) * circumference;
  // SVG ids cannot contain spaces — sanitize the label
  const gradientId = `score-${label.replace(/\s+/g, "-")}-gradient`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg]"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {color.map((clr, i) => (
                <stop key={i} offset={`${i * 100}%`} stopColor={clr} />
              ))}
            </linearGradient>
          </defs>
          <circle
            stroke="#f3f4f6"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            strokeLinecap="round"
            stroke={`url(#${gradientId})`}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        {/* Score text — separate div so it doesn't inherit the SVG rotation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold dark:text-gray-300 text-gray-800">{safeScore}</span>
          <span className="text-xs text-gray-400 dark:text-gray-300 font-medium">/100</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
};

export function ResumeCircularScores({ data }) {
  const finalscore = data.result[0];

  // Extract the leading number from any format: "85/100", "85%", "85 out of 100", "85"
  const parseScore = (raw) => parseInt(String(raw ?? "").match(/\d+/)?.[0]) || 0;

  const scores = [
    {
      label: "ATS Score",
      score: parseScore(finalscore["ATS Score"]),
      color: ["#34d399", "#059669"],
    },
    {
      label: "Grammar",
      score: parseScore(finalscore["grammer marks"]||finalscore["grammar marks"]),
      color: ["#60a5fa", "#3b82f6"],
    },
    {
      label: "Structure",
      score: parseScore(finalscore["structure marks"]),
      color: ["#c084fc", "#9333ea"],
    },
    {
      label: "Relevance",
      score: parseScore(finalscore["relevant marks"]),
      color: ["#fbbf24", "#d97706"],
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
      {scores.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.5 }}
        >
          <CircularScore {...item} />
        </motion.div>
      ))}
    </div>
  );
}
