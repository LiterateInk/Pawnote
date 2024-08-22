import type { NewsCategory } from "~/models";

export const decodeNewsCategory = (category: any): NewsCategory => {
  return {
    id: category.N,
    name: category.L,
    default: category.estDefaut ?? false
  };
};
