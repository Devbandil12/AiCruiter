import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Welcome() {
  return (
    <div className="relative overflow-hidden p-5 md:p-10 text-white rounded-2xl w-full min-h-[10rem] md:h-[15rem] bg-gradient-to-r from-primary via-indigo-500 to-[#2a2034] dark:from-purple-950 dark:via-indigo-950 dark:to-gray-950 dark:border dark:border-purple-900/40">
      {/* Decorative orbs */}
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5 dark:bg-purple-500/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-36 h-36 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-bold">My Interviews</h2>
        <h3 className="text-lg md:text-2xl mt-2 text-white/80">
          Manage your upcoming Interviews and be ready!
        </h3>
        <div className="mt-4 md:mt-6">
          <Link href={"/Dashboard/Create-Interview"}>
            <Button
              variant="outline"
              className="text-base cursor-pointer md:text-lg bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 font-semibold backdrop-blur-sm transition-all text-white"
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
