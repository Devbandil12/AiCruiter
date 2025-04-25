"use client";
import React from "react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ImprovementPopup from "./popup";

function ResumeScore({ data }) {
  const [popup, setPopup] = useState(false);
  const [popupdetails, setPopupdetails] = useState();

  const handledetailpopup = (details) => {
    setPopupdetails(details);
    setPopup(true);
  };
  console.log(data);
  const suggestion = data?.result[0].replacements;
  return (
    <div className="w-full px-2">
      {popup && <ImprovementPopup data={popupdetails} onClose={setPopup} />}

      {/* Header */}

      <h2 className=" text-center text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
        Analyzed Score
      </h2>
      <div className="w-full ">
        <ResumeCircularScores data={data} />
      </div>

      {/* Content */}

      <div className="mt-6 flex flex-col-reverse lg:flex-row gap-8 items-center justify-between">
        {/* Suggestions List */}

        <div className="flex flex-col items-start justify-center gap-4 ">
          <h2 className="  text-2xl md:text-3xl font-semibold">
            Area Of Improvement
          </h2>
          <div className="flex flex-wrap gap-3 justify-center items-center w-full">
            {suggestion?.map((val, ind) => (
              <span
                onClick={() => handledetailpopup(val)}
                key={ind}
                className="cursor-pointer p-3 rounded-2xl border-2 border-primary w-full sm:w-auto"
              >
                <h2 className="md:text-sm text-center text-lg  font-bold text-primary">
                  {val.area}
                </h2>
              </span>
            ))}
          </div>
        </div>

        {/* Score Circles */}
      </div>
    </div>
  );
}

export default ResumeScore;

const radius = 30;
const stroke = 5;
const normalizedRadius = radius - stroke * 0.5;
const circumference = 2 * Math.PI * normalizedRadius;

const CircularScore = ({ label, score, color }) => {
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (score / 100) * circumference;
    setOffset(progressOffset);
  }, [score]);

  return (
    <div className="flex   flex-col items-center  justify-center space-y-2">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] ">
        <circle
          stroke="#e5e7eb" // Tailwind gray-200
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          strokeLinecap="round"
          stroke={`url(#${label}-gradient)`}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient
            id={`${label}-gradient`}
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
      </svg>
      <div className=" absolute -mt-4 text-center text-gray-800 font-bold">
        <div className="text-sm">{score}/100</div>
      </div>
    </div>
  );
};

export function ResumeCircularScores({ data }) {
  const finalscore = data.result[0];

  const scores = [
    {
      label: "ATS_Score",
      score: parseInt(finalscore["ATS Score"]?.substring(0, 2)),
      color: ["#34d399", "#059669"],
      bgcolor: "bg-[lightgreen]",
    }, // green
    {
      label: "Grammar",
      score: parseInt(finalscore["grammer marks"]?.substring(0, 2)),
      color: ["#60a5fa", "#1e3a8a"],
      bgcolor: "bg-[lightblue]",
    }, // blue
    {
      label: "Structure",
      score: parseInt(finalscore["structure marks"]?.substring(0, 2)),
      color: ["#c084fc", "#7c3aed"],
      bgcolor: "bg-purple-200",
    }, // purple
    {
      label: "Relevance",
      score: parseInt(finalscore["relevant marks"]?.substring(0, 2)),
      color: ["#facc15", "#ca8a04"],
      bgcolor: "bg-yellow-200",
    }, // yellow
  ];

  return (
    <div className="w-full md:w-auto flex  text-sm justify-center items-center md:items-end  gap-3 flex-wrap p-8">
      {scores.map((item, index) => (
        <div
          key={index}
          className={`${item?.bgcolor}  w-[10rem] py-2 px-1 rounded-2xl flex items-center justify-center gap-2`}
        >
          <CircularScore key={index} {...item} />
          <h2 className=" text-lg font-bold ">{item.label}</h2>
        </div>
      ))}
    </div>
  );
}
