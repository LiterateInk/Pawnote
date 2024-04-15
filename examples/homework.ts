import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiHomeworkReturnType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  // const from = new Date("2023-10-16");
  // const to = new Date("2023-10-18");
  // const homework = await pronote.getHomeworkForInterval(from, to);

  // From today until the end of the year.
  const homework = await pronote.getHomeworkForInterval(new Date());

  // Little separator.
  console.log("---");

  homework
    // We can filter by homeworks not done.
    // .filter((homework) => !homework.done)
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

      if (homework.return) {
        if (homework.return.type === PronoteApiHomeworkReturnType.PAPER) {
          console.log("(return) => on paper ; should be returned to teacher manually");
        }
        else if (homework.return.type === PronoteApiHomeworkReturnType.FILE_UPLOAD) {
          console.log("(return) => file upload", homework.return.uploaded ? `(uploaded: ${homework.return.uploaded.url})` : "(not uploaded)");
        }
      }

      if (homework.lessonResourceID) {
        console.log("(info) => lesson content is available, see :", homework.lessonResourceID);
      }

      // Little separator.
      console.log("---");
    });
})();
