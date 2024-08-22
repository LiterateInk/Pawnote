import { type GradeValue, GradeKind } from "~/models";

export const decodeGradeValue = (grade: string | number): GradeValue => {
  let kind: GradeKind = GradeKind.Grade;
  let value: number;

  // see `constructor()` (typenote.js)
  if (typeof grade === "string") {
    // see `getGenreNote(aChaine)` (typenote.js)
    if (grade.split("|").length >= 2) {
      kind = parseInt(grade.split("|")[1]) as GradeKind;
    }

    // see `noteToValeur(aStrNote)` (typenote.js)
    value = parseFloat(grade.replace(",", "."));

    if (kind === GradeKind.AbsentZero || kind === GradeKind.UnreturnedZero) {
      value = 0.00;
    }
    // NOTE: there's apparently an `else if` condition here that's missing
    // that mentions the "Congratulations" grade kind.
    // not sure how this affects the code for now but it's worth noting.
  }
  else if (typeof grade === "number") {
    value = grade;
  }
  else {
    throw new Error("decodeGradeValue: Unknown grade type.");
  }

  return {
    kind,
    points: value
  };
};
