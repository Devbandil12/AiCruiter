"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Focus, MenuIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function FeatureCard({ item, index }) {
  const direction = -40;
  return (
    <motion.div
      initial={{ opacity: 0, x: direction }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="group text-xl font-bold overflow-hidden  relative rounded-2xl border-1 shadow-lg h-[30rem]">
        <img
          src={item?.image}
          className="absolute group-hover:scale-105 transition-all duration-200  -z-40 rounded-2xl object-center w-[30rem] h-full object-cover"
        />

        <div className="  absolute w-full  rounded-2xl -z-30 h-full bg-[#00000081]"></div>
        <div className=" flex-col h-full text-white flex items-start justify-between p-5">
          <div className="w-full flex items-center justify-between p-2">
            <div className=" flex gap-3 items-center justify-center">
              <h2 className=" flex items-center justify-center w-8 h-8 rounded-full p-1 bg-primary">
                {item?.icon1}
              </h2>
              <h2>{item?.name}</h2>
            </div>
            <h2 className=" text-primary flex items-center justify-center w-8 h-8 rounded-full p-1 bg-gray-200">
              {item?.icon2}
            </h2>
          </div>
          <Link href={item?.path}>
            <Button
              disabled={item?.name === "Daily Routine"}
              className="hover:scale-105 cursor-pointer"
            >
              {item?.name == "Daily Routine" ? "coming soon...." : item?.name}
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
