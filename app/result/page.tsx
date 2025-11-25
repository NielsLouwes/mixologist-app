"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();

  const ingredients: string[] =
    JSON.parse(searchParams.get("ingredients")?.toLowerCase()) || [];
  const guesses: string[] =
    JSON.parse(searchParams.get("guesses")?.toLowerCase()) || [];

  const correctCount = guesses?.filter((guess) =>
    ingredients.includes(guess)
  ).length;

  return (
    <div>
      <h1>Results</h1>
      <h2>
        You guessed {correctCount} out of {ingredients.length} ingredients
        correct!
      </h2>
      <p>The correct ingredients are:</p>
      <ul>
        {ingredients?.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <Link href="/">
        <button className="border rounded px-4 py-2 hover:border-2 hover:border-emerald-400 hover:cursor-pointer">
          Try again
        </button>
      </Link>
    </div>
  );
}
