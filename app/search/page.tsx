import DrinkList from "@/components/DrinkList";
import SearchIngredientForm from "@/components/SearchIngredientForm";

type SearchPageProps = { searchParams?: { ingredient?: string } };

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const ingredient = params?.ingredient?.trim() || "gin".trim();
  const encodedIngredient = encodeURIComponent(ingredient);

  const fetchCocktailsByIngredient = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodedIngredient}`
      );

      const data = await response.json();
      return data?.drinks ? data.drinks : [];
    } catch (err) {
      console.error("Error fetching cocktails", err);
      return [];
    }
  };

  const cocktails = await fetchCocktailsByIngredient();

  return (
    <div className="w-full">
      <SearchIngredientForm />
      <DrinkList ingredient={ingredient} cocktails={cocktails} />
    </div>
  );
};

export default SearchPage;
