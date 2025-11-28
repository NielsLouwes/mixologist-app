import { searchCocktail } from "@/app/search/actions";
import React from "react";

const SearchIngredientForm = () => {
  return (
    <div>
      <form
        action={searchCocktail}
        className="mb-2 md:mb-8 flex gap-4 items-center"
      >
        <label className="mr-2" htmlFor="cocktail-input">
          Enter ingredient name:
        </label>
        <input
          className="border rounded px-4 py-2"
          type="text"
          name="cocktail-input"
          autoComplete="off"
          id="cocktail-input"
          required
        />
        <button
          type="submit"
          className="border rounded px-4 py-2 hover:border-2 hover:border-emerald-400 hover:cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchIngredientForm;
