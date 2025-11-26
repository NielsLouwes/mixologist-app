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
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {ingredients.map((_, index) => (
          <input
            placeholder={`Ingredient ${index + 1}`}
            className="border rounded px-4 py-2"
            key={index}
            name={`ingredient-${index}`}
          />
        ))}
        <button
          type="submit"
          className="border rounded px-4 py-2 hover:border-2 hover:border-emerald-400 hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DrinkForm;
