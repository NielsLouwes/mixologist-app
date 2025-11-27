import { Drink } from "@/types/global-types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getIngredients = (drink?: Drink) => {
  if (!drink) {
    return {
      ingredients: [],
      ingredientCount: 0,
      combined: [],
    };
  }

  const ingredients: string[] = [];
  const measurements: string[] = [];

  for (let i = 1; i <= 10; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];

    if (ingredient) ingredients.push(ingredient);
    if (measure) measurements.push(measure);
  }

  const combined = ingredients.map((ing, idx) =>
    measurements[idx] ? `${ing} - ${measurements[idx]}` : ing
  );

  return {
    ingredients,
    ingredientCount: ingredients.length,
    combined,
  };
};

export const parseAndLowerCase = (
  key: string,
  searchParams: ReadonlyURLSearchParams
): string[] => {
  const value = searchParams.get(key) || "[]";

  return (JSON.parse(value) as string[]).map((item) => item.toLowerCase());
};
