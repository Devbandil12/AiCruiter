import React from "react";

function GeneratedQuestionList({ questiondata }) {
  return (
    <div className="flex flex-col gap-3">
      {questiondata?.map((val, ind) => (
        <div
          key={ind}
          className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-white/10 hover:border-purple-200 dark:hover:border-purple-700 transition-colors duration-150"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center mt-0.5">
            {ind + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {val.question}
            </p>
            <span className="inline-block mt-2 text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
              {val["type of interview"]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeneratedQuestionList;
