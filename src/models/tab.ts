import type { Period } from "./period";
import type { TabLocation } from "./tab-location";

export type Tab = Readonly<{
  defaultPeriod?: Period
  location: TabLocation
  periods: Period[]
}>;
