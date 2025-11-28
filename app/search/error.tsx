"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 max-w-2xl mx-auto">
      <div className="brutal-border bg-[#FF6347] p-8 brutal-shadow-lg w-full">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Failed to search cocktails
        </h2>
        <div className="brutal-border bg-white p-4 brutal-shadow-sm">
          <p className="font-bold text-lg">
            {error.message || "Unable to fetch cocktails. Please try again."}
          </p>
        </div>
      </div>
      <button
        onClick={reset}
        className="brutal-border bg-[#FFD700] px-8 py-4 font-black text-lg uppercase tracking-wide brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}

