import { searchCocktail } from "@/app/search/actions";
import React from "react";

const SearchIngredientForm = () => {
  return (
    <div className="mb-6 md:mb-8">
      <form
        action={searchCocktail}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
      >
        <label
          className="font-black text-lg uppercase tracking-wide"
          htmlFor="cocktail-input"
        >
          Enter ingredient name:
        </label>
        <input
          className="brutal-border bg-[#F5F5F5] px-4 py-3 font-bold brutal-shadow-sm focus:outline-none focus:bg-white focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all flex-1 min-w-[200px]"
          type="text"
          name="cocktail-input"
          autoComplete="off"
          id="cocktail-input"
          required
        />
        <button
          type="submit"
          className="brutal-border bg-[#90EE90] px-6 py-3 font-black text-lg uppercase tracking-wide brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchIngredientForm;
