import { Cocktail } from "@/types/global-types";
import Image from "next/image";

const CocktailDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log("id", id);

  const fetchCocktailById = async (): Promise<Cocktail | undefined> => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
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

  const cocktail = await fetchCocktailById();
  console.log("cocktail", cocktail);

  return (
    <div>
      <h1>Cocktail name: {cocktail?.drinks[0].strDrink}</h1>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={cocktail?.drinks[0].strDrinkThumb}
          alt={cocktail?.drinks[0].strDrink}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <ul>
        Ingredients
        {}
      </ul>
      <p>Instructions: {cocktail?.drinks[0].strInstructions}</p>
    </div>
  );
};

export default CocktailDetailsPage;
