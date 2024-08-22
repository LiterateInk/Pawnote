import type { SubjectAverages } from "~/models";
import { decodeGradeValue } from "./grade-value";
import { decodeSubject } from "./subject";

export const decodeSubjectAverages = (average: any): SubjectAverages => {
  return {
    student: average.moyEleve && decodeGradeValue(average.moyEleve.V),
    outOf: average.baremeMoyEleve && decodeGradeValue(average.baremeMoyEleve.V),
    defaultOutOf: average.baremeMoyEleveParDefaut && decodeGradeValue(average.baremeMoyEleveParDefaut.V),
    class_average: decodeGradeValue(average.moyClasse.V),
    min: decodeGradeValue(average.moyMin.V),
    max: decodeGradeValue(average.moyMax.V),
    subject: decodeSubject(average),
    backgroundColor: average.couleur
  };
};
