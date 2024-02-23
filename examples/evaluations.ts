import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });


  const period = pronote.readDefaultPeriodForEvaluations();
  console.log("Fetching for period:", period.name, "\n");

  const evaluations = await pronote.getEvaluations(period);

  evaluations.forEach((evaluation) => {
    console.log(evaluation.name, "::", evaluation.description || "(no description)");
    console.log("Submitted the", evaluation.date.toLocaleString());

    console.group("-> Skills");

    evaluation.skills.forEach((skill) => {
      console.group(`-> ${skill.item?.name ?? "Unknown skill"}`);
      console.log(`${skill.level} : ${skill.abbreviation} (x${skill.coefficient})`);
      console.log(`${skill.pillar.name} in the domain of ${skill.domain.name}`);
      console.groupEnd();
    });

    console.groupEnd();

    // Line break for next iteration.
    console.log();
  });
})();
