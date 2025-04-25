import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Check,
  ClipboardCopy,
  Copy,
  Facebook,
  Instagram,
  MailCheck,
  Menu,
  Plus,
  Share2,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { redirect } from "next/navigation";

const InfoPill = ({ icon: Icon, children }) => (
  <p className="flex items-center gap-2 p-2 rounded-3xl bg-[#9233ea29] text-sm">
    <Icon size={12} />
    {children}
  </p>
);

function InterviewLink({ interviewid = "12312jhjh", formdata, questions }) {
  // const shortId = interviewid.substring(0, 8);
  const interviewURL = `${process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000/"}interview/${interviewid}`;
  const jobDuration = formdata?.jobduration || "20 min";
  const questionCount = questions?.length || 0;
  const copylink = async () => {
    await navigator.clipboard.writeText(interviewURL);
    toast.success("link copied");
  };
  return (
    <div className="flex flex-col items-center gap-y-12 p-5">
      <div className="w-full flex flex-col items-center p-5 rounded-3xl">
        <div className="my-4 w-15 h-15 p-5 bg-green-500 text-white shadow-md rounded-full text-center">
          <Check />
        </div>
        <h2 className="text-xl font-bold text-center">
          Your interview Link is ready!
        </h2>
        <p className=" text-center">
          Share this link with the candidate to start the interview.
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-y-5 p-3 shadow-lg rounded-3xl">
        <div className="w-full flex justify-between">
          <h2 className="text-lg font-bold">Interview link</h2>
          <span className="text-[13px] text-primary font-semibold p-2 rounded-2xl">
            Valid for 30 minutes
          </span>
        </div>

        <div className="w-full flex justify-between items-center">
          <Input
            value={interviewURL}
            className="mt-2 text-xl text-purple-400 font-semibold"
            readOnly
          />
          <Button
            onClick={copylink}
            className="text-lg p-4 cursor-pointer items-center justify-center flex"
          >
            <Copy />
            Copy Link
          </Button>
        </div>

        <div className="w-full mt-3 flex gap-3 flex-wrap">
          <InfoPill icon={Timer}>{jobDuration} Min</InfoPill>
          <InfoPill icon={Menu}>{questionCount} Questions</InfoPill>
          <InfoPill icon={Calendar}>Expires in 30 minutes</InfoPill>
        </div>
      </div>

      <div className="w-full flex text-primary justify-between bg-[#c896f436] items-center px-3 p-5 shadow-lg rounded-3xl">
        <h2 className="font-bold text-black">Share via</h2>

        <MailCheck />
        <Facebook />
        <Instagram />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 p-4 shadow-lg rounded-3xl">
        <Button
          onClick={() => redirect("/Dashboard")}
          variant="outline"
          className="cursor-pointer"
        >
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Button>

        <Button onClick={() => redirect("/Home")} className="cursor-pointer">
          <Plus className="mr-2" />
          Create a New Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewLink;
