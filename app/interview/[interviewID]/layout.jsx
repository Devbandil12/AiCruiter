import { Interviewdataprovider } from "@/context/InterviewDataContet";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Interviewdataprovider>{children}</Interviewdataprovider>
    </div>
  );
}

export default layout;
