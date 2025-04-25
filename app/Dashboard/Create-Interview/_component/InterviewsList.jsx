import { Button } from "@/components/ui/button";

import { Copy, Send } from "lucide-react";

import React from "react";

function InterviewsList({ interview }) {
  console.log(interview);
  return (
    <div className="   rounded-3xl mt-1 p-5">
      <div className=" flex items-center justify-start gap-5">
        {interview?.map((val, ind) => {
          return (
            <div
              key={ind}
              className="shadow-lg border border-primary gap-y-1 flex flex-col items-start justify-between w-[20rem] rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-center justify-between w-full">
                <span className="w-10 h-10 rounded-full bg-primary"></span>
                <h2
                  className={`text-sm  text-red-600 font-semibold ${val?.completed === "true" && "text-green-500 rounded-2xl p-1 bg-green-500"}`}
                >
                  {val?.completed == "false" ? "pending " : "completed"}
                </h2>
              </div>

              {/* Job Role */}
              <h2 className="text-lg font-bold text-primary mt-3">
                {val?.jobRole}
              </h2>

              {/* Duration */}
              <p className="text-sm text-gray-600">{val?.jobduration} Min</p>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3 mt-4 w-full">
                <Button variant="outline" className="flex gap-1 items-center">
                  <Copy size={16} /> Copy Link
                </Button>
                <Button className="flex gap-1 items-center">
                  <Send size={16} /> Send
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewsList;
