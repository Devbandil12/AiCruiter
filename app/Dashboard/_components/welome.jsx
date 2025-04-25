import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Welcome() {
  return (
    <div className="p-5 md:p-10 text-white rounded-2xl w-full md:h-[15rem] bg-gradient-to-r from-primary via-indigo-500 to-[#2a2034]">
      <div className="w-full flex flex-col justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-bold">My Interviews</h2>
        <h3 className="text-lg md:text-2xl mt-2 text-gray-50">
          Manage your upcoming Interviews and be ready!
        </h3>
        <div className="mt-4 md:mt-6">
          <Link href={"/Dashboard/Create-Interview"}>
            <Button
              variant={"outline"}
              className="text-base cursor-pointer md:text-lg bg-transparent border-0 font-semibold"
            >
              + Create New Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
