import RandomCocktail from "@/components/RandomCocktail";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense
      fallback={
        <div className="brutal-border bg-[#87CEEB] p-8 text-center font-bold text-xl brutal-shadow-sm">
          Loading cocktail...
        </div>
      }
    >
      <RandomCocktail />
    </Suspense>
  );
}
