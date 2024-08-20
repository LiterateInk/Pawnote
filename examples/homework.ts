import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  // Grab all the homework for week 1 through week 4.
  const homework = await pronote.homeworkFromWeek(handle, 1, 4);

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
        switch (homework.return.kind) {
          case pronote.HomeworkReturnKind.None:
            console.log("(return) => no return required");
            break;
          case pronote.HomeworkReturnKind.Paper:
            console.log("(return) => on paper ; should be returned to teacher manually");
            break;
          case pronote.HomeworkReturnKind.FileUpload:
            console.log("(return) => file upload", homework.return.uploaded ? `(uploaded: ${homework.return.uploaded.url})` : "(not uploaded)");
            break;
          case pronote.HomeworkReturnKind.Kiosk:
            console.log("(return) => kiosk (not implemented)");
            break;
          case pronote.HomeworkReturnKind.AudioRecording:
            console.log("(return) => audio recording (not implemented)");
            break;
        }
      }

      if (homework.lessonResourceID) {
        console.log("(info) => lesson content is available, see ID @", homework.lessonResourceID);
      }

      console.log(); // Linebreak.
    });
}();
