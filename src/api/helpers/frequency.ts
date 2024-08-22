import type { SessionHandle, WeekFrequency } from "~/models";

export const frequency = (session: SessionHandle, weekNumber: number): WeekFrequency | undefined => {
  if (weekNumber < 1) throw new Error("Week number must be at least 1.");
  else if (weekNumber > 62) throw new Error("Week number can't be more than maximum value which is 62.");

  return session.instance.weekFrequencies.get(weekNumber);
};
