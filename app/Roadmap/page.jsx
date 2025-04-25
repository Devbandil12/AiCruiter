"use client";
import React, { useState } from "react";

const initialRoadmap = [
  {
    category: "Frontend Development",
    milestones: [
      { name: "HTML", completed: true },
      { name: "CSS", completed: true },
      { name: "JavaScript", completed: false },
      { name: "React", completed: false },
      { name: "TypeScript", completed: false },
      { name: "Next.js", completed: false },
    ],
  },
  {
    category: "Backend Development",
    milestones: [
      { name: "Node.js", completed: false },
      { name: "Express.js", completed: false },
      { name: "MongoDB", completed: false },
      { name: "Authentication", completed: false },
      { name: "REST APIs", completed: false },
      { name: "GraphQL", completed: false },
    ],
  },
  {
    category: "DevOps",
    milestones: [
      { name: "Docker", completed: false },
      { name: "CI/CD", completed: false },
      { name: "Monitoring", completed: false },
      { name: "Kubernetes", completed: false },
      { name: "Infrastructure as Code (IaC)", completed: false },
    ],
  },
];

const MilestoneGrid = () => {
  const [roadmap, setRoadmap] = useState(initialRoadmap);

  const toggleMilestone = (sectionIndex, milestoneIndex) => {
    const updated = roadmap.map((section, sIdx) => {
      if (sIdx !== sectionIndex) return section;
      return {
        ...section,
        milestones: section.milestones.map((m, mIdx) =>
          mIdx === milestoneIndex ? { ...m, completed: !m.completed } : m
        ),
      };
    });
    setRoadmap(updated);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Roadmap Milestones
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmap.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white shadow-md rounded-xl p-5 relative"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              {`${sectionIndex + 1}. ${section.category}`}
            </h2>
            <ul className="relative">
              {section.milestones.map((milestone, idx) => (
                <li
                  key={idx}
                  className="flex items-start relative pl-4 mb-3 cursor-pointer"
                  onClick={() => toggleMilestone(sectionIndex, idx)}
                >
                  {idx !== section.milestones.length - 1 && (
                    <div className="absolute top-2.5 left-2 h-full border-l-2 border-gray-300"></div>
                  )}
                  <span
                    className={`h-3 w-3 rounded-full mt-1.5 mr-2 z-10 ${
                      milestone.completed ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  <span
                    className={`${
                      milestone.completed ? "text-green-700" : "text-gray-800"
                    } font-medium`}
                  >
                    {milestone.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneGrid;
