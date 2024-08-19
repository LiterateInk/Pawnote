import type { Subject } from "~/models";

export const decodeSubject = (subject: any): Subject => {
  return {
    id: subject.N,
    name: subject.L,
    inGroups: subject.estServiceGroupe ?? false
  };
};
