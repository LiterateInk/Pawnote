import type { Evaluation, Skill } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeSubject } from "./subject";
import { decodeSkill } from "./skill";

export const decodeEvaluation = (evaluation: any): Evaluation => {
  const skills: Skill[] = evaluation.listeNiveauxDAcquisitions.V.map(decodeSkill);
  skills.sort((skillA, skillB) => skillA.order - skillB.order);

  return {
    skills,
    name: evaluation.L,
    id: evaluation.N,
    teacher: evaluation.individu.V.L,
    coefficient: evaluation.coefficient,
    description: evaluation.descriptif,
    subject: decodeSubject(evaluation.matiere.V),
    levels: evaluation.listePaliers.V.map((level: any) => level.L),
    date: decodePronoteDate(evaluation.date.V)
  };
};
