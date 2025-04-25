import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import GeneratedQuestionList from "./GeneratedQuestionList";
import { Button } from "@/components/ui/button";

function Generatequestion({ questiondata, loading, finish, saveLoading }) {
  return (
    <div className=" mt-5 ">
      {loading ? (
        <div className="  flex items-center justify-start gap-3 p-1 bg-[#9233ea12] rounded-3xl border-2 border-primary">
          <Loader2 className=" animate-spin w-10" />
          <div>
            <h2 className=" text-xl">Your question is being generated </h2>
            <h2 className=" text-primary text-sm">
              our Ai qualifying questions for you to provide you high queslity
              questions{" "}
            </h2>
          </div>
        </div>
      ) : (
        <div className=" p-10 bg-gray-50 rounded-3xl border-2 border-black mt-5 ">
          {
            <div className=" flex items-center justify-end">
              {" "}
              {questiondata && (
                <Button onClick={finish}>
                  {saveLoading ? (
                    <Loader2 className=" animate-spin" />
                  ) : (
                    "start"
                  )}
                </Button>
              )}
            </div>
          }
          <h2 className=" text-center my-5 md:text-lg underline text-primary font-bold ">
            {" "}
            Here are you Interview Question with appriciation
          </h2>
          {questiondata && (
            <GeneratedQuestionList questiondata={questiondata} />
          )}
        </div>
      )}
    </div>
  );
}

export default Generatequestion;
