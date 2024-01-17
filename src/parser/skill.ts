import type { PronoteApiUserEvaluations } from "~/api/user/evaluations/types";

/**
 * Aka. `Acquisition`, a skill is an information concerning evaluations.
 * It's like a grade but different...
 */
export class StudentSkill {
  public id: string;

  /**
   * Order the skill should be shown.
   * For example, if this value is `2`, then it should be shown
   * as the second skill on the evaluation skills table.
   */
  public order: number;

  /** @example "Très bonne maîtrise" */
  public value: string;
  /** @example "A+" */
  public abbreviationValue: string;

  /** Apparently there's a coefficient on skills... not sure how it's calculated though. */
  public coefficient: number;

  /**
   * Domain tree containing that skill.
   *
   * @example
   * {
   *   id: "...",
   *   name: "Écouter et comprendre"
   * }
   */
  public domain: {
    id: string
    name: string
  };

  /**
   * Skill's item.
   * Like what it is really.
   *
   * @example
   * {
   *   id: "...",
   *   name: "Se familiariser aux réalités sonores de la langue, et s’entraîner à la mémorisation."
   * }
   */
  public item?: {
    id: string
    name: string
  };

  /**
   * Skill's pillar.
   * This is linked to the student's level.
   *
   * @example
   * {
   *   id: "...",
   *   name: "LANGUES VIVANTES (ÉTRANGÈRES OU RÉGIONALES)",
   *   prefixes: ["D1.2", "D2"]
   * }
   */
  public pillar: {
    id: string
    name: string
    prefixes: Array<string>
  };

  constructor (skill: PronoteApiUserEvaluations["response"]["donnees"]["listeEvaluations"]["V"][number]["listeNiveauxDAcquisitions"]["V"][number]) {
    this.id = skill.N;

    this.order = skill.ordre;

    this.value = skill.L;
    this.abbreviationValue = skill.abbreviation;

    this.coefficient = skill.coefficient;

    this.domain = {
      id: skill.domaine.V.N,
      name: skill.domaine.V.L
    };

    if (skill.item) {
      this.item = {
        id: skill.item.V.N,
        name: skill.item.V.L
      };
    }

    this.pillar = {
      id: skill.pilier.V.N,
      name: skill.pilier.V.L,
      prefixes: skill.pilier.V.strPrefixes.split(",").map((prefix) => prefix.trim())
    };
  }
}
