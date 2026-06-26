"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function FeatureCard({ item, index }) {
  const isDisabled = item?.name?.trim() === "Daily Routine";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="group font-bold overflow-hidden relative rounded-2xl border shadow-md h-[22rem] sm:h-[26rem] md:h-[30rem]">
        <img
          src={item?.image}
          className="absolute group-hover:scale-105 transition-all duration-300 -z-40 rounded-2xl w-full h-full object-cover object-center"
        />
        <div className="absolute w-full rounded-2xl -z-30 h-full bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

        <div className="flex-col h-full text-white flex items-start justify-between p-6">
          {/* Top row: icons */}
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                {item?.icon1}
              </div>
              <h2 className="text-base font-semibold">{item?.name?.trim()}</h2>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
              {item?.icon2}
            </div>
          </div>

          {/* Bottom: description + CTA */}
          <div className="space-y-3">
            {item?.description && (
              <p className="text-sm font-normal text-white/75 leading-relaxed max-w-xs">
                {item.description}
              </p>
            )}
            <Link href={item?.path}>
              <Button
                disabled={isDisabled}
                className="mt-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-105 cursor-pointer border border-white/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDisabled ? "Coming Soon" : `Try ${item?.name?.trim()}`}
                <ArrowRight className="w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
