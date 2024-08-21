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

  console.log("---");

  for (const assignment of assignments) {
    console.log(assignment.subject.name, "to finish before the", assignment.deadline.toLocaleString());
    console.log("(description) =>", assignment.description);

    if (assignment.return.canUpload) {
      const fileName = "hello-world.txt";

      const encoder = new TextEncoder();
      const buffer = encoder.encode(`Hello, world! This file was sent by Pawnote, the ${Date.now()} !`);
      const file = new Blob([buffer], { type: "text/plain" });

      await pronote.assignmentUploadFile(handle, assignment.id, file, fileName);
      console.info("(upload) => successfully uploaded", fileName);
    }

    console.log("---");
  }
}();
