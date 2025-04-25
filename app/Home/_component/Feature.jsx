import { Featurelist } from "@/constant/constant";
import React from "react";
import FeatureCard from "./FeatureCard";

function Feature() {
  const features = Featurelist;
  return (
    <div className=" mt-10 flex flex-col gap-5 items-center justify-center p-5 ">
      <h2 className=" p-3 px-7 text-center bg-purple-200 text-primary rounded-3xl font-semibold text-sm  ">
        Push yourself to Improve
      </h2>
      <h2 className=" text-center text-3xl md:text-4xl font-bold text-indigo-500">
        Kick Start a New Journey With New Features
      </h2>
      <p className="  text-center flex-wrap max-w-[40rem] ">
        Discover new Features like Resumer Analyzer, daily Routine, and
        personalised roadmap, this will help you to improve
      </p>
      <div className="gap-5 mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
        {features.map((val, ind) => {
          return <FeatureCard key={ind} index={ind} item={val} />;
        })}
      </div>
    </div>
  );
}

export default Feature;
