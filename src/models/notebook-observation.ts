import type { NotebookObservationKind } from "./notebook-observation-kind";
import type { Subject } from "./subject";

export type NotebookObservation = Readonly<{
  id: string;
  date: Date;

  opened: boolean;
  shouldParentsJustify: boolean;

  name: string
  kind: NotebookObservationKind

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
