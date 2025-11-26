import CocktailCard from "@/components/CocktailCard";
import { Cocktail } from "@/types/global-types";

const SearchPage = async () => {
  const fetchCocktailsByIngredient = async (): Promise<
    Cocktail | undefined
  > => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
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

  const cocktails = await fetchCocktailsByIngredient();

  return (
    <div className="w-full">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0">
        {cocktails?.drinks.map((drink) => (
          <CocktailCard key={drink.idDrink} drink={drink} />
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
