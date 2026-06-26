import React from "react";
import { X, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

function ImprovementPopup({ onClose, data }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl relative border-t-4 border-purple-500 flex flex-col max-h-[90vh]"
      >
        {/* Sticky header */}
        <div className="px-6 pt-6 pb-4 pr-14 flex-shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-500">
            Improvement Area
          </span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-1">
            {data?.area}
          </h2>
        </div>

        {/* Close — fixed to card top-right */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg p-1 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-6 space-y-3 flex-1">
          {/* Before → After */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1.5">
              Current
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {data?.from || "—"}
            </p>
          </div>

          <div className="flex items-center justify-center py-1">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="h-px w-10 bg-gray-200 dark:bg-gray-700" />
              <ArrowDown className="w-4 h-4 text-purple-400" />
              <div className="h-px w-10 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1.5">
              Improved
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {data?.to || "—"}
            </p>
          </div>

          {/* Advice */}
          {data?.advice && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-900/40">
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
                Advice
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.advice}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ImprovementPopup;
