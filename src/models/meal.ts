import type { Food } from "./food";

export type Meal = Readonly<{
  name?: string
  entry?: ReadonlyArray<Food>
  main?: ReadonlyArray<Food>
  side?: ReadonlyArray<Food>
  drink?: ReadonlyArray<Food>
  fromage?: ReadonlyArray<Food>
  dessert?: ReadonlyArray<Food>
}>;
