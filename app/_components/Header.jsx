"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

import { ChevronDown, LogOut, ScanLine, Stars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const [scroll, setScroll] = useState(false);
  const [modal, setModal] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="mt-1 rounded-4xl p-2 flex items-center justify-between md:justify-center md:p-5 md:pr-8 gap-4 md:gap-[5rem] md:pt-2 font-semibold">

      {/* ── Logo ── */}
      <div className="flex items-center justify-baseline rounded-3xl p-2">
        <Stars className="text-[#9333EA]" />
        <h2 className="text-2xl font-bold text-[#9333EA]">Aicruiter</h2>
      </div>

      {/* ── Desktop nav ── */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-6">

          {/* Nav pills */}
          <div
            onClick={(e) => router.push("/" + e.target.innerText)}
            className="flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800/70 rounded-3xl p-1"
          >
            {["Home", "Dashboard", "Resume", "Billing", "How it works"].map(
              (val, ind) => (
                <h3
                  key={ind}
                  className={`hover:text-[#9333EA] hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer p-1.5 px-3 rounded-3xl ${
                    path.startsWith("/" + val)
                      ? "text-primary bg-white dark:bg-gray-700"
                      : "text-black dark:text-gray-200"
                  }`}
                >
                  {val}
                </h3>
              )
            )}
          </div>

          {/* ScanLine icon */}
          <div className="group flex hover:shadow-md relative">
            <Link href={"/Resume"}>
              <ScanLine className="text-[#9333EA] cursor-pointer" size={25} />
            </Link>
            <p className="border group-hover:block text-gray-600 dark:text-gray-300 hidden text-sm top-full mt-1 p-1 px-2 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm right-0 absolute whitespace-nowrap">
              Analyze Resume
            </p>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* ── Desktop user avatar + dropdown ── */}
      <div className="hidden md:block relative">
        <div onClick={() => setModal((pre) => !pre)} className="cursor-pointer">
          <div className="md:hover:bg-gray-50 dark:md:hover:bg-gray-800 gap-1 flex items-center justify-center rounded-3xl p-2">
            <div className="relative mx-2 group w-8 h-8 rounded-full overflow-hidden shadow-lg ring-1 ring-primary ring-opacity-40 transition-all duration-300 ease-in-out hover:scale-105 hover:ring-indigo-400 hover:ring-opacity-100">
              <Image
                src={user?.imageUrl || "/profileleveling.jpg"}
                alt="Power Profile"
                fill
                className="object-cover object-top brightness-110 transition-all duration-300 group-hover:brightness-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
            </div>
            {!user ? (
              <h2 className="text-xl dark:text-white">login/logout</h2>
            ) : (
              <h2 className="text-sm font-mono flex items-center gap-2 dark:text-gray-200">
                {user.fullName}
                <ChevronDown className="w-4 text-gray-400" />
              </h2>
            )}
          </div>
        </div>

        {modal && (
          <div className="z-50 text-gray-400 p-2 bg-white dark:bg-gray-900 rounded-3xl absolute right-0 top-full mt-2 w-[15rem] shadow-lg border border-gray-100 dark:border-white/10">
            <div className="items-center justify-start flex flex-col gap-4">
              <div className="flex items-center justify-start">
                <div className="relative mx-2 group w-[3rem] h-[3rem] rounded-full overflow-hidden shadow-lg ring-1 ring-primary ring-opacity-40 transition-all duration-300 ease-in-out hover:scale-105 hover:ring-indigo-400 hover:ring-opacity-100">
                  <img
                    src={user?.imageUrl || "/profileleveling.jpg"}
                    alt="Power Profile"
                    className="w-full h-full object-cover object-top brightness-110 transition-all duration-300 group-hover:brightness-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
                </div>
                <div>
                  <h2 className="text-[15px] text-black dark:text-white">{user?.fullName}</h2>
                  <h2 className="text-[10px] text-gray-500 dark:text-gray-400">
                    {user?.primaryEmailAddress.emailAddress}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => signOut({ redirectUrl: "/Home" })}
                className="text-red-500 flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile: theme toggle + hamburger ── */}
      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button onClick={() => setScroll((pre) => !pre)}>
          <svg
            className="w-6 h-6 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {scroll ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {scroll && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="block md:hidden z-50 w-full top-[3.75rem] left-0 absolute rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-white/10 p-2"
        >
          <div className="flex-col flex items-start justify-center gap-10">
            <div
              onClick={(e) => {
                setScroll(false);
                router.push("/" + e.target.innerText);
              }}
              className="w-full flex flex-col items-center justify-center gap-3 rounded-3xl p-1"
            >
              {["Home", "Dashboard", "Resume", "Billing", "How it works"].map(
                (val, ind) => (
                  <div key={ind}>
                    <h3
                      className={`hover:text-[#9333EA] hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer p-1.5 px-3 rounded-3xl dark:text-gray-200 ${
                        path.startsWith("/" + val) && "bg-white dark:bg-gray-700 text-[#9333EA]"
                      }`}
                    >
                      {val}
                    </h3>
                  </div>
                )
              )}
            </div>

            <div className="w-full gap-1 flex items-center justify-center rounded-3xl">
              <div className="relative mx-2 group w-8 h-8 rounded-full overflow-hidden shadow-lg ring-1 ring-primary ring-opacity-40 transition-all duration-300 ease-in-out hover:scale-105 hover:ring-indigo-400 hover:ring-opacity-100">
                <img
                  src={user?.imageUrl || "/profileleveling.jpg"}
                  alt="Power Profile"
                  className="w-full h-full object-cover object-top brightness-110 transition-all duration-300 group-hover:brightness-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
              </div>
              {!user ? (
                <h2 className="text-xl dark:text-white">login/logout</h2>
              ) : (
                <h2 className="text-sm font-mono flex items-center gap-2 dark:text-gray-200">
                  {user.fullName}
                  <ChevronDown className="w-4 text-gray-400" />
                </h2>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Header;
