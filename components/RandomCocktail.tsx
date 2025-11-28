import Image from "next/image";
import DrinkForm from "./DrinkForm";
import { getIngredients } from "@/utils/global-utils";
import { CocktailData } from "@/types/global-types";

const fetchRandomCocktail = async (): Promise<CocktailData> => {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random cocktail");
  }

  const data = await response.json();

  if (!data?.drinks?.[0]) {
    throw new Error("No cocktail data available");
  }

  return data;
};

const RandomCocktail = async () => {
  const cocktailData = await fetchRandomCocktail();
  const cocktail = cocktailData.drinks[0];

  const { ingredients, ingredientCount } = getIngredients(cocktail);

  return (
    <div>
      <h2 className="mb-24 text-2xl font-bold">
        This tool is for all aspiring mixologists who want to master their
        cocktails. Guess the ingredients in each cocktail.
      </h2>

      <div className="flex gap-20">
        <div>
          <h3 className="font-extrabold text-2xl">{cocktail.strDrink}</h3>
          <div className="border-rounded">
            <Image
              src={cocktail.strDrinkThumb}
              alt="random cocktail"
              width={450}
              height={450}
              loading="eager"
              className="rounded-3xl mt-12"
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-xl flex mb-12">
            Ingredients : {ingredientCount}
          </p>
          <DrinkForm ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
};

export default RandomCocktail;
