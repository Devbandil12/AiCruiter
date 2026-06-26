"use client";
import React, { useContext, useEffect, useState } from "react";

import InterviewsList from "./Create-Interview/_component/InterviewsList";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Plus, StarsIcon } from "lucide-react";
import LoadingThreeDotsJumping from "../loading";
import Link from "next/link";
import Welcome from "./_components/Welcome";
import { interviewcontext } from "@/context/InterviewDataContet";
function Page() {
  const [loading, setLoading] = useState(false);

  const { interviews, SetInterviews } = useContext(interviewcontext);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const getinterviews = async () => {
      setLoading(true);
      const res = await axios.get(
        "/api/interviews?email=" + user?.primaryEmailAddress.emailAddress
      );
      SetInterviews(res.data);
      setLoading(false);
    };
    getinterviews();
  }, [user]);
  return (
    <div className="min-h-screen dark:bg-gray-950">
      {/* Welcome banner with horizontal padding so rounded corners show */}
      <div className="px-4 sm:px-6 md:px-10 pt-5 pb-4">
        <Welcome />
      </div>

      {/* Interviews section */}
      <div className="px-4 sm:px-6 md:px-10 pb-10">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-xl font-semibold dark:text-white">Previous Interviews</h2>
          <Link href={"/Dashboard/Create-Interview"}>
            <div className="flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
              New
            </div>
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <LoadingThreeDotsJumping />
          </div>
        )}

        {interviews?.length == 0 ? (
          <div className="mt-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-2 py-20 text-gray-400 dark:text-gray-500">
            <StarsIcon className="w-10 h-10 mb-1" />
            <p className="font-semibold text-base text-gray-500 dark:text-gray-400">No interviews yet</p>
            <p className="text-sm">Click <strong>New</strong> above to create your first interview</p>
          </div>
        ) : (
          <InterviewsList interview={interviews} />
        )}
      </div>
    </div>
  );
}

export default Page;
