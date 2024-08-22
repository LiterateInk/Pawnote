import type { NotebookAbsence } from "./notebook-absence";
import type { NotebookDelay } from "./notebook-delay";
import type { NotebookObservation } from "./notebook-observation";
import type { NotebookPrecautionaryMeasure } from "./notebook-precautionary-measure";
import type { NotebookPunishment } from "./notebook-punishment";

export type Notebook = Readonly<{
  absences: NotebookAbsence[];
  delays: NotebookDelay[]
  punishments: NotebookPunishment[]
  observations: NotebookObservation[]
  precautionaryMeasures: NotebookPrecautionaryMeasure[]
}>;
