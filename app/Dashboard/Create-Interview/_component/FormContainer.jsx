import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Code, Crown, ExpandIcon, Puzzle, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const interviewTypeOptions = [
  { icon: <Code className="w-4 h-4" />, name: "Technical" },
  { icon: <User2 className="w-4 h-4" />, name: "Behavioral" },
  { icon: <ExpandIcon className="w-4 h-4" />, name: "Experience" },
  { icon: <Puzzle className="w-4 h-4" />, name: "Problem Solving" },
  { icon: <Crown className="w-4 h-4" />, name: "Leadership" },
];

function FormContainer({ handlechange, GoToNext }) {
  const [inertviewtypelist, setInertviewtypelist] = useState([]);

  useEffect(() => {
    if (inertviewtypelist) {
      handlechange("inertviewtype", inertviewtypelist);
    }
  }, [inertviewtypelist, handlechange]);

  const toggleType = (name) => {
    setInertviewtypelist((pre) =>
      pre.includes(name) ? pre.filter((v) => v !== name) : [...pre, name]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-4 sm:p-6 md:p-8 mt-2">
      {/* Job Role */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Job Role <span className="text-red-400">*</span>
        </label>
        <Input
          onChange={(e) => handlechange("jobRole", e.target.value)}
          placeholder="e.g. Frontend Developer, Product Manager, HR..."
          className="text-sm"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Job Description <span className="text-red-400">*</span>
        </label>
        <Textarea
          onChange={(e) => handlechange("jobdescription", e.target.value)}
          placeholder="Paste the job description or describe the key responsibilities..."
          className="text-sm h-[150px] resize-none"
        />
      </div>

      {/* Interview Duration */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Interview Duration <span className="text-red-400">*</span>
        </label>
        <Select onValueChange={(val) => handlechange("jobduration", val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Interview Type <span className="text-red-400">*</span>
        </label>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Select one or more that apply</p>
        <div className="flex flex-wrap gap-2.5">
          {interviewTypeOptions.map((val, ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => toggleType(val.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-medium transition-all cursor-pointer select-none ${
                inertviewtypelist.includes(val.name)
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              {val.icon}
              {val.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button
          onClick={GoToNext}
          className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 rounded-2xl text-white font-semibold"
        >
          Generate Questions
          <ArrowRight className="ml-1.5 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
