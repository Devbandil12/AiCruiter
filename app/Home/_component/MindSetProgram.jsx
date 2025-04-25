"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FitnessProgram() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={sectionRef}
      className="bg-white px-2 py-8 md:flex md:items-center md:justify-between md:px-10"
    >
      {/* Left Side: Images */}
      <motion.div
        className="md:w-1/2 space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className=" rounded-xl overflow-hidden">
          <img
            src="/grid5.jpg"
            alt="Weightlifting"
            className="w-full h-[17rem] hover:scale-105 transition-all object-cover"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1 rounded-xl overflow-hidden">
            <img
              src="/grid3.jpg"
              alt="Fitness Couple"
              className="w-full h-[15rem] hover:scale-105 transition-all object-bottom rounded-2xl object-cover"
            />
          </div>
          <div className="flex-1 rounded-xl overflow-hidden">
            <img
              src="/grid4.jpg"
              alt="Trainers"
              className="w-full h-[15rem] hover:scale-105 transition-all  rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="/grid1.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="/grid2.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="/grid3.jpg"
              alt=""
            />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Join <span className="font-bold">2,500+</span> members
          </p>
        </div>
      </motion.div>

      {/* Right Side: Content */}
      <motion.div
        className="md:w-1/2 mt-10 md:-mt-10 md:pl-12"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
          Transform your Mind with our Ai Powered Features
        </h1>
        <p className="text-gray-700 mb-6">
          Join our community and achieve your position with personalized roadmap
          and expert daily routine.
        </p>
        <ul className="space-y-4 mb-8">
          {[
            "Practice Realtime Interviews",
            "Create personalised Roadmap",
            "improve Your resume",
          ].map((text, i) => (
            <li key={i} className="flex items-center text-lg text-gray-800">
              <svg
                className="w-6 h-6 text-indigo-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              {text}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300"
        >
          Join now →
        </motion.button>
      </motion.div>
    </div>
  );
}
