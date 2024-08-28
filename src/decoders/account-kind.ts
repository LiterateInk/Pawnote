import { AccountKind, UnreachableError } from "~/models";

/**
 * @param path mobile.eleve.html or eleve.html, both works.
 */
export const decodeAccountKindFromPath = (path: string): AccountKind => {
  const segments = path.split(".");
  segments.pop(); // remove .html

  switch (segments.pop()) {
    case "eleve": return AccountKind.STUDENT;
    case "parent": return AccountKind.PARENT;
    case "professeur": return AccountKind.TEACHER;
    default: throw new UnreachableError("decodeAccountKindFromPath");
  }
};
