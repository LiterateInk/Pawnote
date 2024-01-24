import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const from = new Date("2023-09-18");
  const to = new Date("2023-09-20");

  const lessons = await pronote.getLessonsForInterval(from, to);
  lessons.forEach((lesson) => {
    // Let's use "???" as a placeholder when there's no subject on a lesson.
    const subjectName = lesson.subject?.name ?? "???";

    // Output something...
    console.log(subjectName, "starts the", lesson.start.toLocaleString(), "and ends the", lesson.end.toLocaleString());
    if (lesson.haveLessonResource) {
      console.log("(info) => has lesson resource/content");
    }

    // Break line.
    console.log();
  });
})();
