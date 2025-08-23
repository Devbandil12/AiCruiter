"use client";

// --- MOCKED IMPORTS & DATA ---
// The following imports were removed to resolve build errors.
// In a real application, you would use these to connect to your context and database.
// import { interviewcontext } from "@/context/InterviewDataContet";
// import { db } from "@/db/db";
// import { interviewDetailsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

import {
  Check,
  Copy,
  Trash2,
  Loader2,
  Send,
  Clock,
  Briefcase,
  PlusCircle,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

// --- MOCK DATA ---
// This mock data simulates what would come from your database.
const mockInterviewData = [
  {
    id: "uuid-1",
    jobRole: "Senior Frontend Developer",
    jobduration: "30",
    completed: "false",
  },
  {
    id: "uuid-2",
    jobRole: "UX/UI Designer",
    jobduration: "45",
    completed: "false",
  },
  {
    id: "uuid-3",
    jobRole: "Product Manager",
    jobduration: "60",
    completed: "true",
  },
];

// --- PARENT COMPONENT TO MANAGE STATE ---
// This component now manages the state, simulating the role of your context.
export default function InterviewDashboard({ interview }) {
  const [interviews, setInterviews] = useState(interview);

  return (
    <InterviewsList interview={interviews} SetInterviews={setInterviews} />
  );
}

// --- Reusable Animation Variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function InterviewsList({ interview, SetInterviews }) {
  // const { SetInterviews } = useContext(interviewcontext); // This line is no longer needed

  // --- Empty State Component ---
  const EmptyState = () => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-300 rounded-2xl mt-5">
      <PlusCircle className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">
        No Interviews Created Yet
      </h3>
      <p className="text-gray-500 mt-1">
        Click the Create Interview button to get started.
      </p>
    </div>
  );

  return (
    <div className="p-5">
      {interview?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {interview?.map((val) => (
              <InterviewCard
                key={val.id}
                interviewData={val}
                SetInterviews={SetInterviews}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// --- Individual Interview Card Component ---
function InterviewCard({ interviewData, SetInterviews }) {
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copylink = async (id) => {
    // This assumes NEXT_PUBLIC_DOMAIN is available; otherwise, it might fail silently.
    const link =
      (process.env.NEXT_PUBLIC_DOMAIN || window.location.origin) +
      "/interview/" +
      id;
    await navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  const deleteInterview = async (id) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Interview deleted successfully.");
      SetInterviews((pre) => pre.filter((val) => val.id !== id));
    } catch (error) {
      toast.error("Failed to delete interview.");
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = interviewData?.completed === "true";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="p-5 flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isCompleted ? <Check size={14} /> : <Clock size={14} />}
            {isCompleted ? "Completed" : "Pending"}
          </div>
        </div>

        {/* Job Role & Details */}
        <div className="mt-4">
          <h2
            className="text-xl font-bold text-gray-800 truncate"
            title={interviewData?.jobRole}
          >
            {interviewData?.jobRole}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {interviewData?.jobduration} Minute Interview
          </p>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-2xl">
        {isCompleted ? (
          <Button
            onClick={() => deleteInterview(interviewData?.id)}
            variant="ghost"
            className="w-full flex gap-2 items-center justify-center text-red-500 hover:bg-red-100 hover:text-red-600"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Delete
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => copylink(interviewData?.id)}
              variant="outline"
              className="flex-1 flex gap-2 items-center justify-center"
            >
              {isCopied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              onClick={() =>
                redirect(
                  process.env.NEXT_PUBLIC_DOMAIN +
                    "/interview/" +
                    interviewData.id
                )
              }
              className="flex-1 flex gap-2 items-center justify-center bg-purple-600 hover:bg-purple-700"
            >
              <Send size={16} /> Start
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// The default export is now the parent dashboard component.
// export default InterviewsList;
