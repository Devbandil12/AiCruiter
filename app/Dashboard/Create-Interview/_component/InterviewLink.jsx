import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Check,
  Copy,
  Link2,
  Mail,
  Menu,
  Plus,
  Share2,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const InfoPill = ({ icon: Icon, children }) => (
  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
    <Icon size={13} />
    {children}
  </span>
);

function InterviewLink({ interviewid = "12312jhjh", formdata, questions }) {
  const interviewURL = `${process.env.NEXT_PUBLIC_DOMAIN}interview/${interviewid}`;
  const jobDuration = formdata?.jobduration || "20";
  const questionCount = questions?.length || 0;

  const copylink = async () => {
    await navigator.clipboard.writeText(interviewURL);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 sm:py-10 px-4 sm:px-6 max-w-xl mx-auto w-full">
      {/* Success header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
          <Check className="w-8 h-8 text-green-600 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interview Ready!</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
          Share this link with the candidate to start the interview session.
        </p>
      </div>

      {/* Link card */}
      <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-purple-600" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Interview Link</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={interviewURL}
            readOnly
            className="text-sm text-purple-600 font-medium bg-gray-50 flex-1 min-w-0"
          />
          <Button
            onClick={copylink}
            className="cursor-pointer flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 shrink-0"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <InfoPill icon={Timer}>{jobDuration} min interview</InfoPill>
          <InfoPill icon={Menu}>{questionCount} questions</InfoPill>
        </div>
      </div>

      {/* Share via */}
      <div className="w-full p-5 bg-purple-50 rounded-3xl border border-purple-100">
        <p className="text-sm font-semibold text-gray-700 mb-3">Share via</p>
        <div className="flex gap-3">
          {[
            { icon: Mail, label: "Email" },
            { icon: Share2, label: "Share" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-purple-200 text-sm text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors cursor-pointer"
            >
              <Icon className="w-4 h-4 text-purple-500" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/Dashboard" className="w-full">
          <Button variant="outline" className="w-full cursor-pointer rounded-2xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/Dashboard/Create-Interview" className="w-full">
          <Button className="w-full cursor-pointer rounded-2xl bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
