import type { Subject } from "./subject";

export type NotebookObservation = Readonly<{
  id: string;
  date: Date;

  opened: boolean;
  shouldParentsJustify: boolean;

  sectionName: string
  sectionKind: number // TOOD: enum, see below
  // /** @original `OVS_DefautCarnet` */
  // LogBookIssue = 0,

  // /** @original `OVS_ObservationParent` */
  // Observation = 1,

  // /** @original `OVS_Encouragement` */
  // Encouragement = 2,

  // /** @original `OVS_Autres` */
  // Other = 3

  /**
   * ID of the observation section.
   *
   * Might be useful when you're looking for the same
   * observation section when going through an `StudentObservation` array.
   */
  sectionID: string

  subject?: Subject;
  reason?: string;
}>;
