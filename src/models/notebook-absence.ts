export type NotebookAbsence = Readonly<{
  id: string

  startDate: Date
  endDate: Date

  justified: boolean
  opened: boolean

  daysMissed: number
  hoursMissed: number
  minutesMissed: number

  shouldParentsJustify: boolean
  administrativelyFixed: boolean

  isReasonUnknown: boolean
  reason?: string
}>;
