"use client";

import React, { useMemo, useState } from "react";
import CocktailCard from "./CocktailCard";
import { Drink } from "@/types/global-types";

const DrinkList = ({
  ingredient,
  cocktails,
}: {
  ingredient: string;
  cocktails: Drink[];
}) => {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedCocktails = useMemo(() => {
    const safeArray = Array.isArray(cocktails) ? cocktails : [];

    return [...safeArray].sort((a, b) => {
      const nameA = a?.strDrink || "";
      const nameB = b?.strDrink || "";

      return sortType === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [cocktails, sortType]);

  return (
    <div>
      <div className="flex justify-between">
        {cocktails.length > 0 && (
          <>
            <div>
              Returning cocktails with ingredient:{" "}
              <span className="font-extrabold">{ingredient}</span>
            </div>
            <div>
              <span className="mr-2">Sort by name:</span>
              {sortType === "asc" ? (
                <button
                  onClick={() => setSortType("desc")}
                  className="border-2 px-2 cursor-pointer text-sm md:text-lg"
                  aria-label="Switch to descending sort (Z to A)"
                >
                  A - Z
                </button>
              ) : (
                <button
                  onClick={() => setSortType("asc")}
                  className="border-2 px-2 cursor-pointer text-sm md:text-lg"
                  aria-label="Switch to ascending sort (A to Z)"
                >
                  Z - A
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {sortedCocktails.length === 0 ? (
        <p>No cocktails found for {ingredient}. Try another one.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0 mt-4">
          {sortedCocktails.map((drink: Drink) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrinkList;
