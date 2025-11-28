"use client";
import { parseAndLowerCase } from "@/utils/global-utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();

  const ingredients = parseAndLowerCase("ingredients", searchParams);
  const guesses = parseAndLowerCase("guesses", searchParams);

  const correctCount = guesses?.filter((guess) =>
    ingredients.includes(guess)
  ).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="brutal-border bg-[#FFD700] p-6 md:p-8 mb-6 brutal-shadow-lg">
        <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-4">
          Results
        </h1>
        <div className="brutal-border bg-white p-4 brutal-shadow-sm">
          <h2 className="font-black text-xl md:text-2xl">
            You guessed {correctCount} out of {ingredients.length} ingredients
            correct!
          </h2>
        </div>
      </div>

      <div className="brutal-border bg-[#90EE90] p-6 mb-6 brutal-shadow-lg">
        <h2 className="font-black text-xl md:text-2xl uppercase mb-4">
          The correct ingredients are:
        </h2>
        <ul className="space-y-2">
          {ingredients?.map((ingredient) => (
            <li
              key={ingredient}
              className="brutal-border bg-white px-4 py-3 font-bold brutal-shadow-sm"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link href="/">
          <button className="brutal-border bg-[#87CEEB] px-8 py-4 font-black text-lg uppercase tracking-wide brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
            Try again
          </button>
        </Link>
      </div>
    </div>
  );
}
