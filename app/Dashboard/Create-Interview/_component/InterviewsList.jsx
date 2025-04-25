import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { Check, Copy, Delete, Loader2, Send } from "lucide-react";

import React, { useState } from "react";
import { toast } from "sonner";

function InterviewsList({ interview }) {
  const [loading, setLoading] = useState(false);
  const copylink = async (id) => {
    await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_DOMAIN + "interview/" + id
    );
    toast.success("link copied");
  };

  const deleteInterview = async (id) => {
    setLoading(true);
    await db
      .delete(interviewDetailsTable)
      .where(eq(interviewDetailsTable.id, id));
    setLoading(false);
  };

  return (
    <div className="   rounded-3xl mt-1 p-5">
      <div className=" flex items-center justify-start gap-5">
        {interview.length == 0 && <h2>Create new interview</h2>}
        {interview?.map((val, ind) => {
          return (
            <div
              key={ind}
              className="shadow-lg border border-primary gap-y-1 flex flex-col items-start justify-between w-[20rem] rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-center justify-between w-full">
                <span className="w-10 h-10 rounded-full bg-primary"></span>
                <h2
                  className={`text-sm  font-semibold ${val?.completed === "true" ? "text-white rounded-2xl p-1 bg-green-500" : " text-red-600"}`}
                >
                  {val?.completed == "false" ? "pending " : <Check />}
                </h2>
              </div>

              {/* Job Role */}
              <h2 className="text-lg font-bold text-primary mt-3">
                {val?.jobRole}
              </h2>

              {/* Duration */}
              <p className="text-sm text-gray-600">{val?.jobduration} Min</p>

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3 mt-4 w-full">
                {val.completed === "true" ? (
                  <Button
                    onClick={() => deleteInterview(val?.id)}
                    variant="outline"
                    className="flex bg-red-500 text-white gap-1 cursor-pointer items-center"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Delete size={16} />
                    )}{" "}
                    Delete
                  </Button>
                ) : (
                  <div className=" flex items-center justify-between w-full">
                    <Button
                      onClick={() => copylink(val?.id)}
                      variant="outline"
                      className="flex gap-1 cursor-pointer items-center"
                    >
                      <Copy size={16} /> Copy Link
                    </Button>
                    <Button className="flex gap-1 items-center">
                      <Send size={16} /> Send
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewsList;
