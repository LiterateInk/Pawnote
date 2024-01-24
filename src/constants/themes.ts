import type { PronoteValue } from "~/api/type";

export type PronoteApiThemesList = PronoteValue<24, Array<PronoteApiTheme>>;

export interface PronoteApiTheme {
  /** Name of the theme. */
  L: string
  /** ID of the theme. */
  N: string

  /** Subject in which the theme is from. */
  Matiere: PronoteValue<24, {
    /** Name of the subject. */
    L: string
    /** ID of the subject. */
    N: string
  }>
}
