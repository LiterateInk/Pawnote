import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiGradeType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const period = pronote.readDefaultPeriodForGradesOverview();
  console.log("Fetching for period:", period.name, "\n");

  const gradesOverview = await pronote.getGradesOverview(period);

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

  console.group("--- GRADES ---\n");

  gradesOverview.grades.forEach((grade) => {
    console.log(grade.subject.name, ":", grade.comment || "(no description)");
    console.log("Registered the", grade.date.toLocaleString(), "//", period.name);

    // If there
    if (typeof grade.outOf === "number") {
      if (grade.isOutOf20)
        console.log("-> Grade was transformed to be out of 20.");
      if (grade.isBonus)
        console.log("-> Grade is a bonus, only counted if value is above 10.");
      if (grade.isOptional)
        console.log("-> Grade is optional, only counted if value increases the student's average.");

      console.log("Grade:  ", handleGradeValue(grade.value, grade.outOf, grade.coefficient));
      if (grade.average) console.log("Average:", handleGradeValue(grade.average, grade.outOf, grade.coefficient));
      console.log("Minimum:", handleGradeValue(grade.min, grade.outOf, grade.coefficient));
      console.log("Maximum:", handleGradeValue(grade.max, grade.outOf, grade.coefficient));
      if (grade.subjectFile) console.log("Subject:", grade.subjectFile.name, "=>", grade.subjectFile.url);
      if (grade.correctionFile) console.log("Correction:", grade.correctionFile.name, "=>", grade.correctionFile.url);
    }
    else {
      console.log("Grade doesn't have a valid 'outOf', shouldn't be counted.");
    }

    // Break line for next entry.
    console.log();
  });

  console.groupEnd();

  console.group("--- AVERAGES ---\n");

  gradesOverview.averages.forEach((average) => {
    console.log("->", average.subject.name);
    console.log("Student:", average.student);
    console.log("Class:", average.class_average);
    console.log("Max:", average.max);
    console.log("Min:", average.min);

    // Break line for next entry.
    console.log();
  });

  console.groupEnd();

  console.group("--- GLOBAL AVERAGE ---\n");

  console.log("Student:", gradesOverview.overallAverage ?? "(not available)");
  console.log("Class:", gradesOverview.classAverage ?? "(not available)");

  console.groupEnd();
})();
