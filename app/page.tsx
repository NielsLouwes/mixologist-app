import DrinkForm from "@/components/DrinkForm";
import Image from "next/image";

type Cocktail = {
  drinks: {
    idDrink: string;
    strCategoru: string;
    strDrink: string;
    strDrinkThumb: string;
    strGlass: string;
    strInstructions: string;
    strIngredient: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
  }[];
};

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
      return undefined;
    }
  };

  const cocktail: Cocktail | undefined = await fetchRandomCocktail();
  const drink = cocktail?.drinks[0];

  console.log("cocktail", drink);

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
