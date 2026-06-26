import { AlertCircle, Loader2, RefreshCw, Sparkles } from "lucide-react";
import React from "react";
import GeneratedQuestionList from "./GeneratedQuestionList";
import { Button } from "@/components/ui/button";

function Generatequestion({ questiondata, loading, finish, saveLoading, onRetry }) {
  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex items-center gap-4 p-6 bg-purple-50 rounded-3xl border border-purple-200">
          <div className="flex-shrink-0 p-3 bg-purple-100 rounded-2xl">
            <Loader2 className="animate-spin w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Generating your questions...
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Our AI is crafting high-quality, role-specific questions for you.
            </p>
          </div>
        </div>
      ) : !questiondata ? (
        <div className="flex flex-col items-center gap-4 p-10 bg-red-50 rounded-3xl border border-red-200 text-center">
          <div className="p-3 bg-red-100 rounded-2xl">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Failed to generate questions
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              The AI model is busy or encountered an error. Please try again.
            </p>
          </div>
          <Button
            onClick={onRetry}
            className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl px-6"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-white/10">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Your Interview Questions
              </h3>
              {questiondata && (
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                  {questiondata.length} questions generated — review before continuing
                </p>
              )}
            </div>
          </div>

          {/* Question list */}
          <div className="p-6">
            {questiondata && <GeneratedQuestionList questiondata={questiondata} />}
          </div>

          {/* Footer CTA */}
          {questiondata && (
            <div className="flex justify-end p-6 pt-0 border-t border-gray-100">
              <Button
                onClick={finish}
                disabled={saveLoading}
                className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 rounded-2xl"
              >
                {saveLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Generatequestion;
