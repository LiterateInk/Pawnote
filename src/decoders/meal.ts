import { type Meal, DishKind } from "~/models";
import { decodeFood } from "./food";

export const decodeMeal = (meal: any): Meal => {
  const dishes = meal.ListePlats.V.reduce((acc: any, dish: any) => {
    let key: string;

    switch (dish.G) {
      case DishKind.Entry:
        key = "entry";
        break;
      case DishKind.Main:
        key = "main";
        break;
      case DishKind.Side:
        key = "side";
        break;
      case DishKind.Drink:
        key = "drink";
        break;
      case DishKind.Fromage:
        key = "fromage";
        break;
      case DishKind.Dessert:
        key = "dessert";
        break;
      default:
        throw new Error("unreachable");
    }

    acc[key] = dish.ListeAliments.V.map(decodeFood);
    return acc;
  }, {});

  return {
    name: meal.L,
    ...dishes
  };
};
