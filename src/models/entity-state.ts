export const EntityState = {
  NONE: 0,
  CREATION: 1,
  MODIFICATION: 2,
  DELETION: 3,
  CHILDREN_MODIFICATION: 4
} as const;

export type EntityState = typeof EntityState[keyof typeof EntityState];
