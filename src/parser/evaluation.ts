import type { PronoteApiUserEvaluations } from "~/api/user/evaluations/types"
import { readPronoteApiDate } from "~/pronote/dates"
import { StudentSubject } from "./subject"
import { StudentSkill } from "./skill"

export class StudentEvaluation {
  public name: string
  public id: string
  public teacher: string
  public coefficient: number
  public description: string
  public subject: StudentSubject
  /** @example ["Cycle 4"] */
  public levels: Array<string>
  public skills: Array<StudentSkill>
  public date: Date

  constructor (evaluation: PronoteApiUserEvaluations["response"]["donnees"]["listeEvaluations"]["V"][number]) {
    this.name = evaluation.L;
    this.id = evaluation.N;
    this.teacher = evaluation.individu.V.L;
    this.coefficient = evaluation.coefficient;
    this.description = evaluation.descriptif;
    this.subject = new StudentSubject(evaluation.matiere.V);
    this.levels = evaluation.listePaliers.V.map(level => level.L);
    
    this.skills = evaluation.listeNiveauxDAcquisitions.V.map((skill) => new StudentSkill(skill));
    this.skills.sort((skillA, skillB) => skillA.order - skillB.order);

    this.date = readPronoteApiDate(evaluation.date.V);
  }
}
