import { Button } from "@/components/ui/button";
import { Plus, Star, Stars } from "lucide-react";
import React from "react";
import "../globals.css";
import MindSetProgram from "./_component/MindSetProgram";
import Feature from "./_component/Feature";
import Footer from "../_components/Footer";
import Link from "next/link";
import Image from "next/image";

function page() {
  return (
    <div className="overflow-hidden w-full">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 p-4 sm:p-6 md:px-16 md:py-8">
        {/* Mobile image */}
        <div className="block md:hidden">
          <div className="flex items-center justify-center pt-4">
            <Image
              src="/solo.png"
              alt="AI Interview"
              width={500}
              height={288}
              className="h-72 w-full object-contain"
            />
          </div>
        </div>

        {/* Left: Content */}
        <div className="w-full md:pt-10 flex justify-center md:justify-start flex-col">
          {/* Badge */}
          <div className="mb-5 hidden md:flex items-center gap-2 w-fit border border-purple-200 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <Stars className="w-4 h-4 text-purple-500" />
            AI-Powered Interview Platform
          </div>

          <h1 className="text-4xl md:text-[3.2rem] md:leading-[1.2] font-bold text-center md:text-start text-gray-900 dark:text-white">
            Land Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Dream Job
            </span>{" "}
            with Smarter Practice
          </h1>

          <p className="mt-4 text-center md:text-start text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Practice AI-driven mock interviews, get real-time feedback, and
            optimize your resume — all in one place.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link href="/Dashboard/Create-Interview">
              <Button
                size="lg"
                className="cursor-pointer text-base dark:text-gray-100 px-8 py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 hover:opacity-90 rounded-2xl shadow-lg shadow-purple-200 dark:shadow-purple-900/40"
              >
                Start Practicing <Plus className="ml-1 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/Devbandil12/AiCruiter" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer text-base px-8 py-5 border-2 rounded-2xl dark:border-gray-600 dark:text-white dark:hover:bg-white/10"
              >
                Star on GitHub <Star className="ml-1 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex gap-8 justify-center md:justify-start">
            {[
              { value: "1K+", label: "Interviews Done" },
              { value: "AI", label: "Powered" },
              { value: "Free", label: "to Start" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/solo.png"
            alt="AI Interview"
            width={640}
            height={640}
            className="mainprofile h-[40rem] w-auto"
          />
        </div>
      </div>

      <Feature />

      {/* How It Works Heading */}
      <div className="text-center mt-16 mb-2 px-5">
        <span className="px-5 py-1.5 bg-purple-100 text-purple-700 rounded-full font-medium text-sm">
          Simple Process
        </span>
        <h3 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          How AiCruiter Works
        </h3>
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Three simple steps to go from nervous to confident in your next
          interview.
        </p>
      </div>

      <MindSetProgram />
      <Footer />
    </div>
  );
}

export default page;
