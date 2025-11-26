import CocktailCard from "@/components/CocktailCard";
import SearchIngredientForm from "@/components/SearchIngredientForm";
import { Drink } from "@/types/global-types";

type SearchPageProps = { searchParams?: { ingredient?: string } };

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const ingredient = params?.ingredient?.trim() || "gin".trim();
  const encodedIngredient = encodeURIComponent(ingredient);

  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodedIngredient}`
  );

  if (!response.ok) {
    return (
      <div className="w-full">
        <SearchIngredientForm />
        <p>Failed to fetch cocktails.Try again later.</p>
      </div>
    );
  }

  const data = await response.json();
  const cocktails = data?.drinks ?? [];

  return (
    <div className="w-full">
      <SearchIngredientForm />
      {cocktails.length === 0 ? (
        <p>No cocktails found for {ingredient}. Try another one.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0">
          {cocktails.map((drink: Drink) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
