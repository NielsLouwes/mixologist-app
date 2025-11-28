"use client";

import { useRouter } from "next/navigation";

const DrinkForm = ({ ingredients }: { ingredients: string[] }) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const guesses = [...formData.values()]
      .map((value) => value.toString().trim())
      .filter(Boolean);

    const params = new URLSearchParams({
      guesses: JSON.stringify(guesses),
      ingredients: JSON.stringify(ingredients),
    });

    router.push(`/result?${params.toString()}`);
  };
  return (
    <div className="brutal-border bg-white p-4 md:p-6 brutal-shadow-lg">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {ingredients.map((_, index) => (
          <input
            placeholder={`Ingredient ${index + 1}`}
            className="brutal-border bg-[#F5F5F5] px-4 py-3 font-bold brutal-shadow-sm focus:outline-none focus:bg-white focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
            key={index}
            name={`ingredient-${index}`}
          />
        ))}
        <button
          type="submit"
          className="brutal-border bg-[#90EE90] px-6 py-4 font-black text-lg uppercase tracking-wide brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DrinkForm;
