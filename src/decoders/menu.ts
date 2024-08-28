import { type Menu, MealKind, UnreachableError } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeMeal } from "./meal";

export const decodeMenu = (menu: any): Menu => {
  let entries = menu.ListeRepas.V.reduce((acc: any, meal: any) => {
    let key: string;

    switch (meal.G) {
      case MealKind.Lunch:
        key = "lunch";
        break;
      case MealKind.Dinner:
        key = "dinner";
        break;
      default:
        throw new UnreachableError("decodeMenu");
    }

    acc[key] = decodeMeal(meal);
    return acc;
  }, {});

  return {
    date: decodePronoteDate(menu.Date.V),
    ...entries
  };
};
