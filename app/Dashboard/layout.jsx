import { Interviewdataprovider } from "@/context/InterviewDataContet";
import React from "react";
import { Toaster } from "sonner";

function layout({ children }) {
  return (
    <div className=" bg-gray-50 h-screen mt-10 md:m-0 px-5">
      <Toaster />
      <Interviewdataprovider>{children}</Interviewdataprovider>
    </div>
  );
}

export default layout;
