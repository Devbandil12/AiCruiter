"use client";
import { Button } from "@/components/ui/button";
import { interviewcontext } from "@/context/InterviewDataContet";
import { db } from "@/db/db";
import { feedbacktable, interviewDetailsTable } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import { Check, Send, Timer, User } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

function Page() {
  const { user } = useUser();
  const { interviewID } = useParams();
  const { feedback, interviewinfo } = useContext(interviewcontext);
  console.log(interviewinfo);

  const updateThestatus = async () => {
    const res = await db
      .update(interviewDetailsTable)
      .set({ completed: "true" })
      .where(eq(interviewDetailsTable.id, interviewID));

    console.log(res);
  };
  useEffect(() => {
    updateThestatus();
  }, [interviewID]);

  const handlesendreport = async () => {
    try {
      console.log(feedback);
      const res = await axios.post("/api/sendEmail", {
        email: user?.primaryEmailAddress.emailAddress,
        interviewID: interviewID,
        name: user?.fullName,
        feedback: feedback,
      });
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <div className=" bg-[#f9f4fe] p-10 shadow-lg flex items-center justify-center flex-col">
      <div className=" md:w-full md:pl-[34rem] md:flex items-center justify-between ">
        <span className=" flex items-center justify-center w-20 h-20 rounded-full text-white bg-green-500 ">
          <h2>
            <Check size={30} />
          </h2>
        </span>
        <Button onClick={handlesendreport} className="hidden md:block">
          Send me Reports
        </Button>
      </div>
      <h2 className=" text-2xl font-bold "> Interview completed!</h2>
      <h2 className=" text-gray-500 text-center">
        Than you for participating, hope you hardwork pay off!
      </h2>
      <Button className="block mt-5 md:hidden" onClick={handlesendreport}>
        Send me Reports
      </Button>
      <img
        src={"/interview2.jpg"}
        alt="interview"
        className=" w-[30rem] object-center rounded-2xl shadow-lg mt-4"
      />
      <div className=" gap-3 p-5 mt-10 flex flex-col items-center justify-center bg-[#dec0f9] rounded-2xl shadow-lg">
        <div className=" w-10 h-10 bg-primary flex items-center justify-center rounded-full">
          <Send className=" text-white  " />
        </div>
        <h2 className=" text-2xl font-bold"> What next?</h2>
        <h2 className=" text-center text-sm">
          We will process you interview feedback and mail you on{" "}
          <strong>{user?.primaryEmailAddress.emailAddress}</strong>
        </h2>
        <h2 className=" flex items-center justify-center">
          <Timer />
          Respose will be in 2-3 days
        </h2>
      </div>
    </div>
  );
}

export default Page;
