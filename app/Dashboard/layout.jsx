import React from "react";
import { Toaster } from "sonner";

function layout({ children }) {
  return (
    <div className=" bg-gray-50 h-screen mt-10 md:m-0 px-5">
      <Toaster />
      {children}
    </div>
  );
}

export default layout;
