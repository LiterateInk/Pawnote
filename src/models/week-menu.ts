import type { FoodAllergen } from "./food-allergen";
import type { FoodLabel } from "./food-label";
import type { Menu } from "./menu";

export type WeekMenu = Readonly<{
  containsLunch: boolean
  containsDinner: boolean

  /**
   * Menu for each day of the week.
   */
  days: ReadonlyArray<Menu>

  /**
   * Week numbers that are available
   * for the menu.
   */
  weeks: ReadonlyArray<number>

  allergens: ReadonlyArray<FoodAllergen>
  labels: ReadonlyArray<FoodLabel>
}>;
