import DrinkList from "@/components/DrinkList";
import SearchIngredientForm from "@/components/SearchIngredientForm";

type SearchPageProps = { searchParams?: { ingredient?: string } };

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const ingredient = params?.ingredient?.trim();

  if (!ingredient) {
    return (
      <div className="w-full">
        <SearchIngredientForm />
        <div className="brutal-border bg-[#87CEEB] p-6 brutal-shadow-sm mt-6">
          <p className="font-bold text-lg">
            Enter an ingredient name to search for cocktails.
          </p>
        </div>
      </div>
    );
  }

  const encodedIngredient = encodeURIComponent(ingredient);

  const fetchCocktailsByIngredient = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodedIngredient}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cocktails");
    }

    const data = await response.json();
    return data?.drinks || [];
  };

  const cocktails = await fetchCocktailsByIngredient();
  console.log("cocktails", cocktails);

  return (
    <div className="w-full">
      <SearchIngredientForm />
      <DrinkList ingredient={ingredient} cocktails={cocktails} />
    </div>
  );
};

export default SearchPage;
