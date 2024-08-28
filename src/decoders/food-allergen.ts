import type { FoodAllergen } from "~/models";

export const decodeFoodAllergen = (allergen: any): FoodAllergen => ({
  name: allergen.L,
  color: allergen.couleur
});
