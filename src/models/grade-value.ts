import type { GradeKind } from "./grade-kind";

export type GradeValue = Readonly<{
  kind: GradeKind
  points: number
}>;
