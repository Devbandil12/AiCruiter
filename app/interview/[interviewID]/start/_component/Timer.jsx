"use client";
import { Clock } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export default function Timer({ limit = 5, setIsRunning, isRunning, compact = false }) {
  const [secondsLeft, setSecondsLeft] = useState(limit * 60);
  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [secondsLeft, setIsRunning]);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-sm bg-slate-800 text-lime-400 px-3 py-1.5 rounded-lg">
        <Clock size={13} />
        {formatTime(secondsLeft)}
      </div>
    );
  }

  return (
    <div className="flex my-2 flex-col items-center gap-4 text-2xl font-mono p-2 bg-gray-900 text-lime-400 rounded-xl w-fit shadow-lg">
      <div>{formatTime(secondsLeft)}</div>
    </div>
  );
}
