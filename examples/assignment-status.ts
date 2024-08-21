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

  for (const assignment of assignments) {
    console.log(assignment.subject.name, "to finish before the", assignment.deadline.toLocaleString());

    // Make everything done.
    if (!assignment.done) {
      await pronote.assignmentStatus(handle, assignment.id, true);
      console.log("(done) => successfully marked as done.");
    }
    else {
      console.log("(done) => already marked as done.");
    }

    console.log(); // Linebreak.
  }
}();
