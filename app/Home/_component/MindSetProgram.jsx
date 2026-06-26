"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrainCircuit, FileSearch, MessageSquareText, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: <MessageSquareText className="w-7 h-7 text-purple-600" />,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    title: "Create Your Interview",
    description:
      "Pick your job role, experience level, and interview type. AiCruiter instantly tailors questions just for you.",
  },
  {
    step: "02",
    icon: <BrainCircuit className="w-7 h-7 text-indigo-600" />,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    title: "Practice with AI",
    description:
      "Engage in a realistic voice-based interview powered by AI. Answer naturally — just like a real interview.",
  },
  {
    step: "03",
    icon: <FileSearch className="w-7 h-7 text-blue-600" />,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    title: "Get Detailed Feedback",
    description:
      "Receive a full performance breakdown — technical skills, communication, problem-solving, and an overall score.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef} className="py-12 px-5 md:px-16 bg-white dark:bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-start p-5 sm:p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/10 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-7xl font-black text-purple-100 absolute top-3 right-5 select-none leading-none">
              {step.step}
            </span>
            <div className={`mb-4 p-3 rounded-2xl ${step.iconBg}`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="flex justify-center mt-12"
      >
        <Link href="/Dashboard/Create-Interview">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3.5 rounded-2xl font-semibold text-base shadow-lg shadow-purple-200 dark:shadow-purple-900/40 transition-all cursor-pointer"
          >
            Start Your Interview <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
