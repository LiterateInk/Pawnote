import type { Grade } from "./grade";
import type { GradeValue } from "./grade-value";
import type { SubjectAverages } from "./subject-averages";

export type GradesOverview = Readonly<{
  subjectsAverages: SubjectAverages[]
  overallAverage?: GradeValue
  classAverage?: GradeValue
  grades: Grade[]
}>;
