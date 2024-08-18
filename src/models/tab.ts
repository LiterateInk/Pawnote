import type { Period } from "./period";

export type Tab = Readonly<{
  defaultPeriod?: Period
  periods: Period[]
}>;
