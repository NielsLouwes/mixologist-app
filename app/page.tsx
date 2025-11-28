import RandomCocktail from "@/components/RandomCocktail";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">Loading cocktail...</div>}
    >
      <RandomCocktail />
    </Suspense>
  );
}
