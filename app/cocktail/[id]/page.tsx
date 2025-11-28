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
    <div className="max-w-4xl mx-auto">
      <div className="brutal-border bg-[#FF6347] p-6 mb-6 brutal-shadow-lg">
        <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-2">
          Cocktail name
        </h1>
        <p className="font-bold text-xl md:text-2xl">{drink.strDrink}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="brutal-border bg-white p-4 brutal-shadow-sm">
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            sizes="(max-width: 768px) 100vw, 400px"
            loading="lazy"
            height={400}
            width={400}
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="brutal-border bg-[#90EE90] p-6 mb-4 brutal-shadow-sm">
            <h2 className="font-black text-xl md:text-2xl uppercase mb-4">
              Ingredients and measurements
            </h2>
            <ul className="space-y-2">
              {measuredIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="brutal-border bg-white px-4 py-2 font-bold brutal-shadow-sm"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="brutal-border bg-[#9370DB] p-6 brutal-shadow-lg">
        <h2 className="font-black text-xl md:text-2xl uppercase mb-4">
          Instructions
        </h2>
        <div className="brutal-border bg-white p-6 brutal-shadow-sm">
          <p className="font-bold text-base md:text-lg leading-relaxed">
            {drink.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetailsPage;
