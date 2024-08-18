import type { Period, Tab } from "~/models";

export const decodeTab = (tab: any, instancePeriods: Period[]): Tab => {
  const find = (p1: any) => instancePeriods.find((p2) => p2.id === p1.N);

  const defaultPeriod = find(tab.periodeParDefaut?.V);
  const periods = tab.listePeriodes.V.map((p1: any) => find(p1)).filter(Boolean);

  return {
    defaultPeriod,
    periods
  };
};
