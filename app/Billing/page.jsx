"use client";

import { Button } from "@/components/ui/button";
import { Check, Heart, Coffee, Send, Star } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ConfettiPiece = ({ x, y, rotation, color }) => (
  <motion.div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      backgroundColor: color,
      width: "8px",
      height: "16px",
      rotate: rotation,
    }}
    animate={{
      y: "120vh",
      opacity: [1, 1, 0],
      rotate: rotation + (Math.random() * 360 - 180),
    }}
    transition={{ duration: Math.random() * 2 + 2, ease: "easeOut" }}
  />
);

function FunnyBillingPage() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select your preferred method of awesomeness.");
      return;
    }
    setIsPaid(true);
    toast.success("Payment successful! The universe thanks you.");
  };

  const paymentOptions = [
    {
      id: "smile",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "One Good Deed",
      description: "Pay it forward. Help someone out today.",
    },
    {
      id: "laugh",
      icon: <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-600" />,
      title: "A Moment of Joy",
      description: "Tell a joke or share a funny meme with a friend.",
    },
    {
      id: "star",
      icon: <Star className="h-8 w-8 text-yellow-400" />,
      title: "A GitHub Star",
      description: "Support the project so others can find it.",
    },
  ];

  const confettiColors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -50,
    rotation: Math.random() * 360,
    color: confettiColors[i % confettiColors.length],
  }));

  return (
    <div className="relative bg-slate-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {isPaid && confettiPieces.map((p) => <ConfettiPiece key={p.id} {...p} />)}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-black/40 p-8 text-center"
      >
        {isPaid ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Check className="h-20 w-20 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6">
              Transaction Complete!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your invoice has been paid in full with 100% pure awesomeness.
              Thank you for making the world a slightly better place.
            </p>
            <Button
              className="mt-8 w-full text-lg py-6 bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsPaid(false)}
            >
              View My (Still Free) Dashboard
            </Button>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Your Invoice is Ready
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Time to settle the score. Dont worry, we dont take cash.
            </p>

            <div className="my-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-900/40">
              <p className="text-sm text-purple-700 dark:text-purple-300">TOTAL DUE</p>
              <p className="text-5xl font-extrabold text-purple-600 dark:text-purple-400">$0.00</p>
              <p className="text-sm text-purple-500 dark:text-purple-400 mt-1">
                Forever and always.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">
                Choose Your Payment Method:
              </h2>
              {paymentOptions.map((opt) => (
                <motion.div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === opt.id
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 dark:bg-gray-800/50"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {opt.icon}
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{opt.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{opt.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={handlePayment}
              disabled={!paymentMethod}
              className="mt-8 w-full text-lg font-semibold py-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              Pay with Good Vibes <Send className="ml-2 h-5 w-5" />
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default FunnyBillingPage;
