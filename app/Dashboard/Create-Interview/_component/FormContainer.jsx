import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Code,
  Crown,
  ExpandIcon,
  Puzzle,
  User2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function FormContainer({ handlechange, GoToNext }) {
  const [inertviewtypelist, setInertviewtypelist] = useState([]);
  const interviewtype = [
    {
      icon: <Code />,
      name: "Technical",
    },
    {
      icon: <User2 />,
      name: "Behavouable",
    },
    {
      icon: <ExpandIcon />,
      name: "Experience",
    },

    {
      icon: <Puzzle />,
      name: "problem Solving",
    },
    {
      icon: <Crown />,
      name: "leadership",
    },
  ];

  useEffect(() => {
    if (inertviewtypelist) {
      handlechange("inertviewtype", inertviewtypelist);
    }
  }, [inertviewtypelist]);

  return (
    <div className=" pb-10">
      <div className=" mt-2 ">
        <h2 className=" text-xl font-semibold">Job role</h2>
        <Input
          onChange={(e) => handlechange("jobRole", e.target.value)}
          className=" text-lg mt-1"
          placeholder="enter your job role/position like frontend, hr, and so on..."
        />
      </div>
      <div className=" mt-2 ">
        <h2 className=" text-xl font-semibold">Job description</h2>
        <Textarea
          onChange={(e) => handlechange("jobdescription", e.target.value)}
          className=" text-lg mt-1 h-[200px] "
          placeholder="enter you job description here...."
        />
      </div>
      <div className=" mt-2 ">
        <h2 className=" text-xl font-semibold">Job Duration</h2>
        <Select onValueChange={(val) => handlechange("jobduration", val)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 min</SelectItem>
            <SelectItem value="15">15 min</SelectItem>
            <SelectItem value="30">30 min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" mt-2">
        <h2 className=" text-xl font-semibold">Interview type</h2>
        <div
          onClick={(e) =>
            setInertviewtypelist((pre) =>
              pre.includes(e.target.innerText)
                ? (pre = pre.filter((val) => val != e.target.innerText))
                : [...pre, e.target.innerText]
            )
          }
          className=" mt-2 flex flex-wrap items-center justify-start gap-5"
        >
          {interviewtype.map((val, ind) => {
            return (
              <div
                key={ind}
                className={` gap-1 flex items-center p-2 rounded-2xl  hover:bg-primary hover:text-white cursor-pointer border-[1px] hover:border-primary ${
                  inertviewtypelist.includes(val.name) &&
                  "bg-[#9333EA] text-white hover:text-white "
                }`}
              >
                {" "}
                {val.icon}
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className=" flex justify-end mt-7 ">
        <h2
          onClick={GoToNext}
          className="cursor-pointer hover:scale-105 transition-all bg-primary text-white flex rounded-2xl p-2 font-semibold "
        >
          Generate Questions <ArrowRight />
        </h2>
      </div>
    </div>
  );
}

export default FormContainer;
