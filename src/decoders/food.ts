import type { Food } from "~/models";
import { decodeFoodAllergen } from "./food-allergen";
import { decodeFoodLabel } from "./food-label";

export const decodeFood = (food: any): Food => {
  return {
    name: food.L,
    allergens: food.listeAllergenesAlimentaire.V.map(decodeFoodAllergen),
    labels: food.listeLabelsAlimentaires.V.map(decodeFoodLabel)
  };
};
