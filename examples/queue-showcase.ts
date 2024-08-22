import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  // Get the timetable for the 4 first weeks.
  const timetables = await Promise.all(
    [1, 2, 3, 4].map((weekNumber) => pronote.timetableFromWeek(session, weekNumber))
  );

  const amountOfLessons = timetables.map((timetable) => timetable.classes.length);
  amountOfLessons.forEach((amount, index) => {
    console.log(`For week ${index + 1}, there is ${amount} lessons.`);
  });
}();
