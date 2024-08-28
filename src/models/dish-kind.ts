export const DishKind = {
  Entry: 0,
  Main: 1,
  Side: 2,
  Drink: 3,
  Dessert: 4,
  Fromage: 5
} as const;

export type DishKind = typeof DishKind[keyof typeof DishKind];
