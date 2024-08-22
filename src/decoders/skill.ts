import type { Skill } from "~/models/skill";

export const decodeSkill = (skill: any): Skill => {
  return {
    id: skill.N,

    level: skill.L,
    abbreviation: skill.abbreviation,

    coefficient: skill.coefficient,

    domainID: skill.domaine.V.N,
    domainName: skill.domaine.V.L,

    itemID: skill.item?.V.N,
    itemName: skill.item?.V.L,

    order: skill.ordre,

    pillarID: skill.pilier.V.N,
    pillarName: skill.pilier.V.L,
    pillarPrefixes: skill.pilier.V.strPrefixes.split(",").map((prefix: any) => prefix.trim())
  };
};
