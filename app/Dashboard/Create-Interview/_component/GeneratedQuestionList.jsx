import { Stars } from "lucide-react";
import React from "react";

function GeneratedQuestionList({ questiondata }) {
  return (
    <div>
      {questiondata?.map((val, ind) => {
        return (
          <div key={ind} className=" flex items-center justify-center gap-3 ">
            <Stars className=" text-primary w-10" />
            <div className=" p-4 border-2 rounded-2xl w-full my-0.5">
              <h2 className=" text-sm font-semibold">{val.question}</h2>
              <h2 className=" text-primary mt-1 ">
                Type: {val["type of interview"]}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GeneratedQuestionList;
