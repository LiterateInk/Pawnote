import type { Meal } from "./meal";

export type Menu = Readonly<{
  date: Date
  lunch?: Meal
  dinner?: Meal
}>;
