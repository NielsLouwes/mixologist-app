"use client";

import React, { useMemo, useState } from "react";
import CocktailCard from "./CocktailCard";
import { SimpleDrink } from "@/types/global-types";

const DrinkList = ({
  ingredient,
  cocktails,
}: {
  ingredient: string;
  cocktails: SimpleDrink[];
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
      {cocktails.length > 0 && (
        <div className="brutal-border bg-[#FF69B4] p-4 md:p-6 mb-6 brutal-shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="font-black text-lg md:text-xl uppercase leading-[35px]">
              Returning cocktails with ingredient:{" "}
              <span className="bg-[#FFD700] px-2 py-1 brutal-border ">
                {ingredient}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">Sort by name:</span>
              {sortType === "asc" ? (
                <button
                  onClick={() => setSortType("desc")}
                  className="brutal-border bg-[#87CEEB] px-4 py-2 font-black text-sm md:text-base uppercase brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                  aria-label="Switch to descending sort (Z to A)"
                >
                  A - Z
                </button>
              ) : (
                <button
                  onClick={() => setSortType("asc")}
                  className="brutal-border bg-[#87CEEB] px-4 py-2 font-black text-sm md:text-base uppercase brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                  aria-label="Switch to ascending sort (A to Z)"
                >
                  Z - A
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {sortedCocktails.length === 0 ? (
        <div className="brutal-border bg-[#FF6347] p-6 brutal-shadow-sm">
          <p className="font-bold text-lg">
            No cocktails found for {ingredient}. Try another ingredient.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0">
          {sortedCocktails.map((drink: SimpleDrink) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrinkList;
