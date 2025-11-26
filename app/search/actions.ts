"use server";

import { redirect } from "next/navigation";

export async function searchCocktail(formData: FormData) {
  const raw = formData.get("cocktail-input");
  const ingredient =
    typeof raw === "string" ? raw.trim() : raw?.toString().trim();
  console.log("ingredient", ingredient);

  if (!ingredient) {
    redirect("/search");
  }

  const safeUri = encodeURIComponent(ingredient);
  redirect(`/search?ingredient=${safeUri}`);
}
