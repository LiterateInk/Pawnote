import { AccountKind } from "~/models";

export const encodeAccountKindToPath = (kind: AccountKind): string => {
  let name: string;

  switch (kind) {
    case AccountKind.STUDENT:
      name = "eleve";
      break;
    case AccountKind.PARENT:
      name = "parent";
      break;
    case AccountKind.TEACHER:
      name = "professeur";
      break;
  }

  return `mobile.${name}.html`;
};
