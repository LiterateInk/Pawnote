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

  // Grab all the assignments for week 1 through week 4.
  const assignments = await pronote.assignmentsFromWeek(handle, 1, 4);

  assignments
    // We can filter by assignments not done.
    // .filter((assignment) => !assignment.done)
    // We display them in console.
    .forEach((assignment) => {
      // Output something...
      console.log(assignment.subject.name, "to finish before the", assignment.deadline.toLocaleString());
      console.log("(description) =>", assignment.description);

      // If there's attachments, output them too !
      if (assignment.attachments.length > 0) {
        assignment.attachments.forEach((attachment) => {
          console.log("(attachment) =>", attachment.name, ":", attachment.url);
        });
      }

      if (assignment.return) {
        switch (assignment.return.kind) {
          case pronote.AssignmentReturnKind.None:
            console.log("(return) => no return required");
            break;
          case pronote.AssignmentReturnKind.Paper:
            console.log("(return) => on paper ; should be returned to teacher manually");
            break;
          case pronote.AssignmentReturnKind.FileUpload:
            console.log("(return) => file upload", assignment.return.uploaded ? `(uploaded: ${assignment.return.uploaded.url})` : "(not uploaded)");
            break;
          case pronote.AssignmentReturnKind.Kiosk:
            console.log("(return) => kiosk (not implemented)");
            break;
          case pronote.AssignmentReturnKind.AudioRecording:
            console.log("(return) => audio recording (not implemented)");
            break;
        }
      }

      if (assignment.lessonResourceID) {
        console.log("(info) => lesson content is available, see ID @", assignment.lessonResourceID);
      }

      console.log(); // Linebreak.
    });
}();
