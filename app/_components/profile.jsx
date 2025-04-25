"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Profile() {
  const { user } = useUser();
  return (
    <div className=" absolute w-[20rem] p-5">
      <div className="  md:hover:bg-gray-50 gap-1  flex items-center justify-center rounded-3xl p-2 -ml-14">
        <div className="relative mx-2 group w-8 h-8  rounded-full overflow-hidden shadow-lg ring-1 ring-primary ring-opacity-40 transition-all duration-300 ease-in-out hover:scale-105 hover:ring-indigo-400 hover:ring-opacity-100">
          <img
            src="/profileleveling.jpg"
            alt="Power Profile"
            className="w-full h-full  object-cover object-top brightness-110 transition-all duration-300 group-hover:brightness-125"
          />
          {/* Glowing eyes optional: use framer-motion or gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
