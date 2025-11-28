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
      <div className="brutal-border bg-[#FF6347] p-6 md:p-8 mb-6 md:mb-8 brutal-shadow-lg">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
          This tool is for all aspiring mixologists who want to master their
          cocktails. Can you guess the ingredients in each cocktail?
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1">
          <div className="brutal-border bg-white p-4 md:p-6 brutal-shadow-lg">
            <h3 className="font-black text-2xl md:text-3xl mb-4 uppercase tracking-tight">
              {cocktail.strDrink}
            </h3>
            <div className="brutal-border brutal-shadow overflow-hidden">
              <Image
                src={cocktail.strDrinkThumb}
                alt="random cocktail"
                width={500}
                height={500}
                loading="eager"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="brutal-border bg-[#9370DB] p-4 md:p-6 mb-4 md:mb-6 brutal-shadow-sm">
            <p className="font-black text-lg md:text-xl uppercase">
              Ingredients: {ingredientCount}
            </p>
          </div>
          <DrinkForm ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
};

export default RandomCocktail;
