export const MealKind = {
  Lunch: 0,
  Dinner: 1
} as const;

export type MealKind = typeof MealKind[keyof typeof MealKind];
