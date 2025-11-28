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
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-2xl font-bold text-red-600">
        Failed to search cocktails
      </h2>
      <p className="text-gray-600">
        {error.message || "Unable to fetch cocktails. Please try again."}
      </p>
      <button
        onClick={reset}
        className="border rounded px-4 py-2 hover:border-2 hover:border-emerald-400 hover:cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}

