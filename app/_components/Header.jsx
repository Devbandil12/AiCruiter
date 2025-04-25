"use client";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

import { ChevronDown, MenuSquare, ScanLine, Stars } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Header() {
  const [scroll, setScroll] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();

  console.log(user);
  return (
    <div className=" bg-white rounded-4xl  p-2 flex items-center justify-between md:justify-center md:p-5 pr-8 gap-[5rem]  md:mt-2  font-semibold   ">
      <div className="  flex items-center justify-baseline rounded-3xl p-2">
        <Stars className=" text-[#9333EA]" />
        <h2 className=" text-2xl font-bold text-[#9333EA]">Aicruiter</h2>
      </div>
      <div className=" hidden md:block">
        <div className="    flex items-center justify-center gap-10  ">
          <div
            onClick={(e) => router.push("/" + e.target.innerText)}
            className=" flex items-center justify-center gap-3 bg-gray-100 rounded-3xl p-1"
          >
            {["Home", "Dashboard", "Resume", "Billing", "How it works"].map(
              (val, ind) => {
                return (
                  <h3
                    className={` hover:text-[#9333EA] hover:bg-white transition-all cursor-pointer
                        p-1.5 px-3 rounded-3xl ${
                          path.startsWith("/" + val) &&
                          " bg-white text-[#9333EA] "
                        }`}
                    key={ind}
                  >
                    {val}
                  </h3>
                );
              }
            )}
          </div>
          <div className="group flex  hover:shadow-md ">
            <ScanLine className=" text-[#9333EA]  cursor-pointer  " size={25} />
            <p className=" border-1  group-hover:block  text-gray-600 hidden  text-sm top-[4.5rem] p-1 rounded-2xl border-b-0 border-black right-[14rem] absolute ">
              Analyze Resume
            </p>
          </div>
        </div>
      </div>
      <div className=" hidden md:block">
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

          {!user ? (
            <h2 className=" text-xl ">login/logout</h2>
          ) : (
            <h2 className=" text-sm font-mono flex items-center gap-2  ">
              {user.fullName}
              <ChevronDown className=" w-4 text-gray-400" />
            </h2>
          )}
        </div>
      </div>
      <div className=" block md:hidden">
        <MenuSquare onClick={() => setScroll(!scroll)} size={30} />
      </div>

      {scroll && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className=" z-50  w-full top-15 absolute rounded-2xl bg-[#ffffff] shadow-lg p-2"
        >
          <div className="    flex items-center justify-center gap-10   ">
            <div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: "auto", height: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onClick={(e) => router.push("/" + e.target.innerText)}
              className=" flex flex-col items-center justify-center gap-3 rounded-3xl p-1"
            >
              {["Home", "Dashboard", "Resume", "Billing", "How it works"].map(
                (val, ind) => {
                  return (
                    <h3
                      className={` hover:text-[#9333EA] hover:bg-white transition-all cursor-pointer
                        p-1.5 px-3 rounded-3xl ${
                          path.startsWith("/" + val) &&
                          " bg-white text-[#9333EA] "
                        }`}
                      key={ind}
                    >
                      {val}
                    </h3>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Header;
