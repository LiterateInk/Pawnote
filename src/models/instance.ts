export type Instance = Readonly<{
  version: number[]
  name: string
  date: Date

  accounts: Array<{
    name: string
    path: string
  }>

  casURL?: string
  casToken?: string
}>;
