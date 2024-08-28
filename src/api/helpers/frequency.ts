import type { SessionHandle, WeekFrequency } from "~/models";

export const frequency = (session: SessionHandle, weekNumber: number): WeekFrequency | undefined => {
  return session.instance.weekFrequencies.get(weekNumber);
};
