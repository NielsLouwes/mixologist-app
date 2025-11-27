import { ReadonlyURLSearchParams } from "next/navigation";
import { getIngredients, parseAndLowerCase } from "../global-utils";

const testDrink = {
  idDrink: "12345",
  strCategory: "Cocktail",
  strDrink: "Mojito",
  strDrinkThumb: "image.jpg",
  strGlass: "Highball glass",
  strInstructions: "Mix ingredients.",
  strIngredient1: "Rum",
  strIngredient2: "Mint",
  strIngredient3: "Sugar",
  strIngredient10: null,
  strMeasure1: "50ml",
  strMeasure2: "10 leaves",
  strMeasure3: "2 tsp",
};

const testDrinkMoreIngredients = {
  idDrink: "12345",
  strCategory: "Cocktail",
  strDrink: "Mojito",
  strDrinkThumb: "image.jpg",
  strGlass: "Highball glass",
  strInstructions: "Mix ingredients.",
  strIngredient1: "Rum",
  strIngredient2: "Mint",
  strIngredient3: "Sugar",
  strIngredient4: "Lemon",
  strMeasure1: "50ml",
  strMeasure2: "10 leaves",
  strMeasure3: "2 tsp",
};

const emptyDrink = {
  idDrink: "",
  strCategory: "",
  strDrink: "",
  strDrinkThumb: "",
  strGlass: "",
  strInstructions: "",
  strIngredient1: null,
  strIngredient2: null,
  strIngredient3: null,
  strMeasure1: null,
  strMeasure2: null,
  strMeasure3: null,
};

const mockSearchParams = {
  get: (key: string) => {
    switch (key) {
      case "ingredients":
        return JSON.stringify(["Gin", "Lemon", "Sugar"]);
      case "guesses":
        return JSON.stringify(["gin", "lemon", "sugar"]);
      case "ingredients-empty":
        return JSON.stringify([]);
      case "guesses-empty":
        return JSON.stringify([]);
      case "ingredients-missing":
        return null;
      case "guesses-missing":
        return null;
      default:
        return null;
    }
  },
} as unknown as ReadonlyURLSearchParams;

describe("global-utils", () => {
  describe("getIngredients function", () => {
    it("should return a the correct ingredients", () => {
      const result = getIngredients(testDrink);
      expect(result.ingredientCount).toBe(3);
    });

    it("should return the 3 ingredients provided", () => {
      const result = getIngredients(testDrink);
      expect(result.ingredients).toEqual(["Rum", "Mint", "Sugar"]);
    });

    it("should return the 3 combined ingredients with measurements", () => {
      const result = getIngredients(testDrink);
      expect(result.combined).toEqual([
        "Rum - 50ml",
        "Mint - 10 leaves",
        "Sugar - 2 tsp",
      ]);
    });

    it("should return the just the ingredient name if a matching measurements is missing", () => {
      const result = getIngredients(testDrinkMoreIngredients);
      expect(result.combined).toEqual([
        "Rum - 50ml",
        "Mint - 10 leaves",
        "Sugar - 2 tsp",
        "Lemon",
      ]);
    });

    it("should return fallback empty values if drink with no details is passed", () => {
      const result = getIngredients(emptyDrink);
      expect(result).toEqual({
        ingredients: [],
        ingredientCount: 0,
        combined: [],
      });
    });
  });

  describe("parseAndLowerCase", () => {
    it("should parse and lowercase array values", () => {
      const result = parseAndLowerCase("ingredients", mockSearchParams);
      expect(result).toEqual(["gin", "lemon", "sugar"]);
    });

    it("should return empty array when key is missing", () => {
      const result = parseAndLowerCase("ingredients-missing", mockSearchParams);
      expect(result).toEqual([]);
    });

    it("should handle empty arrays", () => {
      const result = parseAndLowerCase("ingredients-empty", mockSearchParams);
      expect(result).toEqual([]);
    });
  });
});
