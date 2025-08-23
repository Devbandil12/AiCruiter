"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BotMessageSquare, FileText, BrainCircuit, Award } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

// --- Reusable Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// --- Step Component for the timeline ---
const StepCard = ({ icon, title, description, isLast = false }) => (
  <div className="flex items-start gap-6">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 border-4 border-white shadow-md">
        {icon}
      </div>
      {!isLast && <div className="w-1 h-32 bg-purple-200 mt-4 rounded"></div>}
    </div>
    <motion.div variants={fadeIn} className="mt-1 flex-1">
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-lg text-gray-600">{description}</p>
    </motion.div>
  </div>
);

function HowItWorksPage() {
  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Step 1: The Blueprint",
      description: "You provide the job role and your resume. Our AI instantly analyzes the position's key requirements and cross-references them with your skills, creating a hyper-realistic interview simulation tailored just for you."
    },
    {
      icon: <BotMessageSquare className="h-8 w-8 text-purple-600" />,
      title: "Step 2: The Conversation",
      description: "Engage in a natural, back-and-forth conversation with our AI interviewer. It asks relevant questions, understands your answers, and probes deeper, just like a real hiring manager would. No scripts, just pure, adaptive intelligence."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-600" />,
      title: "Step 3: The Feedback Loop",
      description: "This is where the magic happens. Immediately after, you get a detailed breakdown of your performance—clarity, confidence, keyword usage, and even the sentiment of your answers. We show you what you nailed and where you can level up."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Step 4: The Ascent",
      description: "It's not a one-time event; it's a journey. Repeat the process, track your progress over time, and watch your confidence soar. Turn weaknesses into strengths and walk into your real interview ready to win.",
      isLast: true
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Your Journey to <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Mastery</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            We've engineered a simple, powerful path to transform you from a nervous candidate into a confident professional. Here’s how.
          </p>
        </motion.div>

        {/* --- TIMELINE --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </motion.div>

        {/* --- CALL TO ACTION --- */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-24"
        >
            <h2 className="text-3xl font-bold text-gray-800">Ready to Begin Your Ascent?</h2>
            <p className="mt-3 text-lg text-gray-600">Your first interview is just a click away.</p>
            <Button onClick={()=>redirect("/Dashboard")} className="mt-8 text-xl font-semibold py-7 px-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Start My First Interview <ArrowRight className="ml-3" />
            </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
