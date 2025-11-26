import { searchCocktail } from "@/app/search/actions";
import React from "react";

const SearchIngredientForm = () => {
  return (
    <div>
      <form action={searchCocktail} className="mb-8" method="POST">
        <label className="mr-8" htmlFor="cocktail-input">
          Enter ingredient name:
        </label>
        <input
          className="border rounded px-4 py-2"
          type="text"
          name="cocktail-input"
          autoComplete="off"
        ></input>
      </form>
    </div>
  );
};

export default SearchIngredientForm;
