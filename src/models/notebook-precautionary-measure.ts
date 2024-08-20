import { Attachment } from "./attachment";

export type NotebookPrecautionaryMeasure = Readonly<{
  id: string;
  title: string;
  comments: string;
  reasons: string[];

  exclusion: boolean;

  circumstances: string;
  circumstancesDocuments: Attachment[];

  decisionMaker: string;
  giver: string;
  dateGiven: Date;
  startDate: Date;
  endDate: Date;

  // TODO: enum, see below
  disallowedAccesses: number[];
  // /** "à l'internat" */
  // Internat = 0,
  // /** "à l'établissement" */
  // Etablissement = 1,
  // /** "à la demi-pension" */
  // DP = 2

}>;
