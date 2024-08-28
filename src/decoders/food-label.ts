import type { FoodLabel } from "~/models";

export const decodeFoodLabel = (label: any): FoodLabel => ({
  name: label.L,
  color: label.couleur
});

