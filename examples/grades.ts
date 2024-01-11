import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiGradeType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const firstTrimester = pronote.periods.find((period) => period.name === "Trimestre 1");
  if (!firstTrimester) throw new Error("Wasn't able to find a period named 'Trimestre 1'.");

  const grades = await firstTrimester.getGrades();
  // Or you can also the following syntax :
  // const grades = await pronote.getGradesForPeriod(firstTrimester);

  const handleGradeValue = (value: number | PronoteApiGradeType, outOf: number, coefficient: number): string => {
    // Handle custom grades.
    if (typeof value !== "number") {
      let message: string;
      switch (value) {
        case PronoteApiGradeType.Absent:
          message = "Absent during this test.";
          break;
        case PronoteApiGradeType.Unreturned:
          message = "Work not returned.";
          break;
        case PronoteApiGradeType.Error:
          message = "Grade is not available.";
          break;
        default:
          throw new Error("Grade type not handled.");
      }

      return message;
    }
    // Otherwise, just print as is.
    else {
      return `${value}/${outOf} (x${coefficient})`;
    }
  };

  grades.forEach((grade) => {
    console.log(grade.subject.name, ":", grade.comment || "(no description)");
    console.log("Registered the", grade.date.toLocaleString(), "//", grade.period.name);

    // If there
    if (typeof grade.outOf === "number") {
      if (grade.isOutOf20)
        console.log("-> Grade was transformed to be out of 20.");
      if (grade.isBonus)
        console.log("-> Grade is a bonus, only counted if value is above 10.");
      if (grade.isOptional)
        console.log("-> Grade is optional, only counted if value increases the student's average.");

      console.log("Grade:  ", handleGradeValue(grade.value, grade.outOf, grade.coefficient));
      console.log("Average:", handleGradeValue(grade.average, grade.outOf, grade.coefficient));
      console.log("Minimum:", handleGradeValue(grade.min, grade.outOf, grade.coefficient));
      console.log("Maximum:", handleGradeValue(grade.max, grade.outOf, grade.coefficient));
    }
    else {
      console.log("Grade doesn't have a valid 'outOf', shouldn't be counted.");
    }

    // Break line for next entry.
    console.log();
  });
})();
