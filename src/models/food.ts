import type { FoodAllergen } from "./food-allergen";
import type { FoodLabel } from "./food-label";

export type Food = Readonly<{
  name: string
  allergens: ReadonlyArray<FoodAllergen>
  labels: ReadonlyArray<FoodLabel>
}>;
