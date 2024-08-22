export type Subject = Readonly<{
  id: string
  name: string

  /**
   * Whether the subject is only within groups.
   */
  inGroups: boolean
}>;
