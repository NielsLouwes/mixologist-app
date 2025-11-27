import { CocktailData } from "@/types/global-types";
import { getIngredients } from "@/utils/global-utils";
import Image from "next/image";

const CocktailDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const fetchCocktailById = async (): Promise<CocktailData | undefined> => {
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
  const drink = cocktail?.drinks[0];

  if (!drink) {
    return <div>No cocktail found</div>;
  }

  const { combined } = getIngredients(drink);

  return (
    <div>
      <h1 className="font-bold">Cocktail name</h1>
      <span>{cocktail?.drinks[0].strDrink}</span>
      <div>
        <Image
          src={cocktail?.drinks[0].strDrinkThumb}
          alt={cocktail?.drinks[0].strDrink}
          sizes="(max-width: 768px) 25vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          height={300}
          width={300}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h2 className="font-bold my-4">Ingredients and measurements</h2>
      <ul>
        {combined.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="font-bold my-2">Instructions</h2>
      <p>{cocktail?.drinks[0].strInstructions}</p>
    </div>
  );
};

export default CocktailDetailsPage;
