export type TimetableClass = Readonly<{
  id: string
  backgroundColor?: string
  startDate: Date
  endDate: Date
  blockLength: number
  blockPosition: number
  notes?: string
  weekNumber: number
}>;
