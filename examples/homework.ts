import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const from = new Date("2023-10-16");
  const to = new Date("2023-10-18");

  const homework = await pronote.getHomeworkForInterval(from, to);

  // Little separator.
  console.log("---");

  homework
    // We filter by homeworks not done.
    .filter((homework) => !homework.done)
    // We display them in console.
    .forEach((homework) => {
      // Output something...
      console.log(homework.subject.name, "to finish before the", homework.deadline.toLocaleString());
      console.log("(description) =>", homework.description);

      // If there's attachments, output them too !
      if (homework.attachments.length > 0) {
        homework.attachments.forEach((attachment) => {
          console.log("(attachment) =>", attachment.name, ":", attachment.url);
        });
      }

      // Little separator.
      console.log("---");
    });
})();
