"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Timer({ limit = 5, setIsRunning, isRunning }) {
  const [secondsLeft, setSecondsLeft] = useState(limit * 60); // 1 hour = 3600s

  const intervalRef = useRef(null);

  // Format seconds into HH:MM:SS
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
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [secondsLeft]);

  return (
    <div className="flex my-2 flex-col items-center gap-4 text-2xl font-mono p-2 bg-gray-900 text-lime-400 rounded-xl w-fit shadow-lg">
      <div>{formatTime(secondsLeft)}</div>
    </div>
  );
}
