import { CocktailData } from "@/types/global-types";
import { getIngredients } from "@/utils/global-utils";
import Image from "next/image";

const fetchCocktailById = async (id: string): Promise<CocktailData> => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cocktail");
  }

  const data = await response.json();

  if (!data?.drinks?.[0]) {
    throw new Error("Cocktail not found");
  }

  return data;
};

const CocktailDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const cocktail = await fetchCocktailById(id);
  const drink = cocktail.drinks[0];

  const { measuredIngredients } = getIngredients(drink);

  return (
    <div>
      <h1 className="font-bold">Cocktail name</h1>
      <span>{drink.strDrink}</span>
      <div>
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          sizes="(max-width: 768px) 25vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          height={300}
          width={300}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h2 className="font-bold my-4">Ingredients and measurements</h2>
      <ul>
        {measuredIngredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="font-bold my-2">Instructions</h2>
      <p>{drink.strInstructions}</p>
    </div>
  );
};

export default CocktailDetailsPage;
