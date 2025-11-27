import { Drink } from "@/types/global-types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getIngredients = (drink: Drink) => {
  if (!drink) {
    return {
      ingredients: [],
      ingredientCount: 0,
      combined: [],
    };
  }

  let count = 0;
  const ingredients: string[] = [];
  const measurements: string[] = [];
  const combined: string[] = [];

  for (const key in drink) {
    if (key.startsWith("strIngredient")) {
      const value = drink[key as keyof Drink];

      if (value !== null && typeof value === "string") {
        count++;
        ingredients.push(value);
      }
    }

    if (key.startsWith("strMeasure")) {
      const value = drink[key as keyof Drink];

      if (value !== null && typeof value === "string") {
        measurements.push(value);
      }
    }
  }

  for (let i = 0; i < ingredients.length; i++) {
    combined.push(`${ingredients[i]} - ${measurements[i]}`);
  }

  return {
    ingredients: ingredients,
    ingredientCount: count,
    combined: combined,
  };
};

export const parseAndLowerCase = (
  key: string,
  searchParams: ReadonlyURLSearchParams
): string[] => {
  const value = searchParams.get(key) || "[]";
  return (JSON.parse(value) as string[]).map((item) => item.toLowerCase());
};
