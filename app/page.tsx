import DrinkForm from "@/components/DrinkForm";
import { Cocktail } from "@/types/global-types";
import Image from "next/image";

/* to do
1. Add input to search for ingredient
2. Search for products
3. Add screen until user has searched
4. Suspence ?
*/

export default async function Home() {
  const fetchRandomCocktail = async (): Promise<Cocktail | undefined> => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );

      if (!response.ok) {
        console.error("failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const cocktail: Cocktail | undefined = await fetchRandomCocktail();
  const drink = cocktail?.drinks[0];

  const getIngredients = () => {
    let count = 0;
    const ingredients: string[] = [];

    for (const key in drink) {
      if (key.startsWith("strIngredient")) {
        const value = drink[key];

        if (value !== null) {
          count++;
          ingredients.push(value);
        }
      }
    }

    return { ingredients: ingredients, ingredientCount: count };
  };

  const { ingredients, ingredientCount } = getIngredients();

  if (!cocktail) {
    return <div>No cocktail found</div>;
  }

  return (
    <div>
      <h2 className="mb-24 text-2xl font-bold">
        This tool is for all aspiring mixologists who want to master their
        cocktails. Guess the ingredients in each cocktail.
      </h2>

      <div className="flex gap-20">
        <div>
          <h3 className="font-extrabold text-2xl">
            {cocktail?.drinks[0].strDrink}
          </h3>
          <div className="border-rounded">
            <Image
              src={cocktail?.drinks[0].strDrinkThumb}
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
}
