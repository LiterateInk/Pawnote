import type { GradesOverview, SessionHandle } from "~/models";
import { decodeSubjectAverages } from "./subject-averages";
import { decodeGradeValue } from "./grade-value";
import { decodeGrade } from "./grade";

export const decodeGradesOverview = (overview: any, session: SessionHandle): GradesOverview => {
  return {
    grades: overview.listeDevoirs.V.map((grade: any) => decodeGrade(grade, session)),
    subjectsAverages: overview.listeServices.V.map(decodeSubjectAverages),
    classAverage: overview.moyGeneraleClasse && decodeGradeValue(overview.moyGeneraleClasse.V),
    overallAverage: overview.moyGenerale && decodeGradeValue(overview.moyGenerale.V)
  };
};
