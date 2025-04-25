import { Button } from "@/components/ui/button";
import { Plus, Star, Stars } from "lucide-react";
import React from "react";
import "../globals.css";
import Feature from "./_component/Feature";
import MindSetProgram from "./_component/MindSetProgram";

function page() {
  return (
    <div className=" w-full">
      <div className=" grid grid-cols-1 md:grid-cols-2  p-5">
        <div className=" block md:hidden">
          <div className="flex items-center justify-center p-10 pt-5">
            <img
              src="/solo.png"
              alt=""
              className="mainprofile block md:hidden h-[30rem] 
"
            />
          </div>
        </div>
        <div className=" md:pt-12 md:px-30 flex justify-center md:justify-start flex-col ">
          <div className="   text-gray-600 w-60 hidden md:block  ">
            <h3 className="  border-2 flex items-center justify-center px-1 rounded-2xl text-center text-[0.8rem] font-semibold  ">
              <Stars className=" text-[#9333EA] w-5" />
              Your New Journey begins here
            </h3>
          </div>
          <h2 className=" md:pr-40 text-center md:text-start  text-4xl md:mt-[4rem] md:text-[4rem] md:leading-15 font-bold">
            Your{" "}
            <span className="font-bold bg-gradient-to-b from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Personal
            </span>{" "}
            Era to{" "}
            <span className=" font-bold bg-gradient-to-b from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              improve
            </span>
          </h2>
          <h2 className="  text-center mt-2 md:text-start md:my-8 md:leading-5">
            Explore customized interviews for your personalised level. Track
            progress, stay motivated, and build a stronger, healthy mindset.
          </h2>
          <div className=" mt-7 flex flex-col-reverse md:mt-2 md:flex-row md:justify-start items-center gap-5">
            <Button
              size={"lg"}
              variant={"outline"}
              className=" p-5 text-lg border-2 rounded-2xl"
            >
              Give us a Star <Star />
            </Button>
            <Button
              className="  text-xl flex p-5 justify-center bg-gradient-to-r from-[#9333EA] via-purple-500 to-blue-700 rounded-2xl items-center"
              size={"lg"}
            >
              {" "}
              Create Interview
              <Plus />
            </Button>
          </div>
        </div>
        <div className=" hidden md:block  mx-20">
          <img
            src="/solo.png"
            alt=""
            className="mainprofile h-[42rem] 
          "
          />
        </div>
      </div>
      <Feature />
      <h2 className=" text-center mt-5 mb-2 text-3xl text-indigo-500">
        <strong>MindSet Utility!</strong>
      </h2>
      <MindSetProgram />
    </div>
  );
}

export default page;
