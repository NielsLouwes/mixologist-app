type IngredientKeys = `strIngredient${number}`;
type MeasureKeys = `strMeasure${number}`;

export type Drink = {
  idDrink: string;
  strCategory: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strInstructions: string;
} & {
  [K in IngredientKeys | MeasureKeys]?: string | null;
};

export type SimpleDrink = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">;

export type CocktailData = {
  drinks: Drink[];
};
