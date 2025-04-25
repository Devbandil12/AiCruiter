"use client";
import React, { useEffect, useState } from "react";

import InterviewsList from "./Create-Interview/_component/InterviewsList";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Plus, StarsIcon } from "lucide-react";
import LoadingThreeDotsJumping from "../loading";
import Link from "next/link";
import Welcome from "./_components/Welcome";
function Page() {
  const [interviewlist, setInterviewlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const getinterviews = async () => {
    setLoading(true);
    const res = await axios.get(
      "/api/interviews?email=" + user?.primaryEmailAddress.emailAddress
    );
    setInterviewlist(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getinterviews();
    }
  }, [user]);
  return (
    <div className=" flex items-center justify-center flex-col">
      <Welcome />

      <div className=" w-full p-5">
        <div className=" flex items-center justify-between px-2">
          <h2 className=" text-xl font-semibold">Previously interviews</h2>
          <Link href={"/Dashboard/Create-Interview"}>
            <Plus className=" text-primary cursor-pointer hover:bg-primary hover:text-white rounded-full  " />
          </Link>
        </div>
        {loading && (
          <div className=" mt-10  ">
            {" "}
            <LoadingThreeDotsJumping />
          </div>
        )}
        {interviewlist.length == 0 ? (
          <div className=" pt-10 border-dashed flex items-center justify-center">
            <StarsIcon />
            <h2>
              <strong>Create New Interviews</strong>
            </h2>
          </div>
        ) : (
          <InterviewsList interview={interviewlist} />
        )}
      </div>
    </div>
  );
}

export default Page;
