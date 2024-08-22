export const NewsView = { // TODO: use this in function parameters instead of constant [0] !!
  Reception: 0,
  Broadcast: 1,
  Draft: 2,
  Template: 3
} as const;

export type NewsView = typeof NewsView[keyof typeof NewsView];
