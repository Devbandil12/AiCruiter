"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AlertCircle, Stars, Video } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { interviewcontext } from "@/context/InterviewDataContet";

function Page() {
  const { interviewID } = useParams();

  const [username, setUsername] = useState("");
  const { interviewinfo, fetchdata } = useContext(interviewcontext);

  useEffect(() => {
    fetchdata(interviewID);
  }, [interviewID]);
  // //   console.log(username);
  return (
    <div className="  flex items-center justify-center mt-10">
      <div className=" border-1 border-primary shadow-lg  flex flex-col items-center justify-center gap-y-3 p-8 rounded-3xl">
        <h2 className=" flex items-center font-black text-primary">
          <Stars className=" text-primary " />
          <strong>AIcruiter</strong>
        </h2>
        {console.log(interviewinfo)}
        <h2 className=" font-bold ">Enter you Full name</h2>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter your name"
          className="border-1  border-primary"
        />
        <div className=" p-3 bg-[#9233ea21] rounded-2xl  flex justify-center gap-2">
          <AlertCircle className=" text-primary" />
          <div className=" ">
            <h2 className=" flex gap-1  text-primary font-bold">
              Things know before interview
            </h2>
            <p className=" text-sm ">-Test you camera and microphone</p>
            <p className=" text-sm ">
              -ensure you have stable internet connection
            </p>
            <p className=" text-sm ">-Find a quite place to start</p>
          </div>
        </div>
        <Button
          onClick={() => redirect("/interview/" + interviewID + "/start")}
          disabled={username.length < 3}
          className="flex w-full items-center"
        >
          <Video />
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Page;
