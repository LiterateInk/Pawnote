import type { Period } from "~/models";

// return entity
export const encodePeriod = (period: Period): any => {
  return {
    N: period.id,
    G: period.kind,
    L: period.name
  };
};
