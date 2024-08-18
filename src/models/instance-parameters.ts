export type InstanceParameters = Readonly<{
  nextBusinessDay: Date
  firstMonday: Date
  firstDate: Date
  lastDate: Date

  periods: Period[]
  holidays: Holiday[]
  weekFrequencies: WeekFrequency[]
}>;
