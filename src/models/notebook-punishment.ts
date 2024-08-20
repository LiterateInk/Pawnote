import type { Attachment } from "./attachment";

export type NotebookPunishment = Readonly<{
  id: string;
  title: string;
  reasons: string[];

  isDuringLesson: boolean;
  exclusion: boolean;

  workToDo: string;
  workToDoDocuments: Array<Attachment>;

  circumstances: string;
  circumstancesDocuments: Array<Attachment>;

  giver: string;
  dateGiven: Date;

  durationMinutes: number;
}>;
