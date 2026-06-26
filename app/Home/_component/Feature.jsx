import { Featurelist } from "@/constant/constant";
import React from "react";
import FeatureCard from "./featureCard";

function Feature() {
  const features = Featurelist;
  return (
    <div className="mt-16 flex flex-col gap-4 items-center justify-center px-5 md:px-16">
      <span className="px-5 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full font-medium text-sm">
        What we offer
      </span>
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Everything You Need to Ace Your Interview
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl">
        From AI-powered mock interviews to resume optimization — we've got every
        step of your job hunt covered.
      </p>
      <div className="gap-5 mt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((val, ind) => (
          <FeatureCard key={ind} index={ind} item={val} />
        ))}
      </div>
    </div>
  );
}

export default Feature;
