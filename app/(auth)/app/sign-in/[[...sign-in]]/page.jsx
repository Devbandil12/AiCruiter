import { SignUp } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div>
      <SignUp mode="modal" />
    </div>
  );
}

export default page;
