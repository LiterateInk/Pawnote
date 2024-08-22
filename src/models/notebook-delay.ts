export type NotebookDelay = Readonly<{
  id: string;
  date: Date;
  minutes: number;
  justified: boolean;
  justification?: string;
  shouldParentsJustify: boolean;
  administrativelyFixed: boolean;
  isReasonUnknown: boolean;
  reason?: string;
}>;
