import type { Period, Tab } from "~/models";

export const decodeTab = (tab: any, instancePeriods: Period[]): Tab => {
  const find = (id: string) => instancePeriods.find((p2) => p2.id === id);

  const defaultPeriod = tab.periodeParDefaut && find(tab.periodeParDefaut.V.N);
  const periods = tab.listePeriodes.V.map((p1: any) => find(p1.N)).filter(Boolean);

  return {
    defaultPeriod,
    location: tab.G,
    periods
  };
};
