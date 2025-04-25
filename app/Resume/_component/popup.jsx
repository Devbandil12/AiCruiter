import React from "react";
import { X } from "lucide-react";

function ImprovementPopup({ onClose, data }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border-t-[5px] border-[#9333EA] animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={() => onClose((pre) => !pre)}
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-[#9333EA] transition"
        >
          <X />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#9333EA] mb-2">{data?.area}</h2>

        {/* Area of Improvement */}

        {/* Suggestions */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>from this </strong>
            <br /> {data?.from || "No suggestions provided."}
          </p>{" "}
          <p className="text-sm text-gray-700">
            <strong>to this</strong>
            <br /> {data?.to || "No suggestions provided."}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Advice</strong>
            <br /> {data?.advice || "No suggestions provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImprovementPopup;
