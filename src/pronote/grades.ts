/**
 * Reads a Pronote grade from their API.
 * When the grade is "17", we leave it as is, 
 * but when it is "|1", we translate it the `PronoteApiGradeType` enum.
 * 
 * @param grade 
 * @returns 
 */
export const readPronoteApiGrade = (grade: string): PronoteApiGradeType | number => {
  // Encoded grade, should translate it.
  if (grade.includes("|")) {
    const gradeType = grade.substring(1);

    switch (gradeType) {
      case "-1":
        return PronoteApiGradeType.Error;
      case "0":
        return PronoteApiGradeType.Grade;
      case "1":
        return PronoteApiGradeType.Absent;
      case "2":
        return PronoteApiGradeType.Exempted;
      case "3":
        return PronoteApiGradeType.NotGraded;
      case "4":
        return PronoteApiGradeType.Unfit;
      case "5":
        return PronoteApiGradeType.Unreturned;
      case "6":
        return PronoteApiGradeType.AbsentZero;
      case "7":
        return PronoteApiGradeType.UnreturnedZero;
      case "8":
        return PronoteApiGradeType.Congratulations;
    }

    throw new Error("readPronoteApiGrade: Unknown grade type.");
  }

  // Leave it as is.
  grade = grade.replace(/,/g, ".");
  const value = parseFloat(grade);

  if (isNaN(value)) return PronoteApiGradeType.Error;
  return value;
};

/**
 * @remark Re-export of `EGenreAnnotation` object in Pronote.
 */
export enum PronoteApiGradeType {
  Error = "-1|ERROR",
  Grade = "0|GRADE",
  Absent = "1|ABSENT",
  Exempted = "2|EXEMPTED",
  NotGraded = "3|NOT_GRADED",
  /** The student is unfit for this evaluation. */
  Unfit = "4|UNFIT",
  /** Unreturned work. */
  Unreturned = "5|UNRETURNED",
  AbsentZero = "6|ABSENT_ZERO",
  UnreturnedZero = "7|UNRETURNED_ZERO",
  Congratulations = "8|CONGRATULATIONS"
};
