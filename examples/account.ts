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

  // Basic account data that we can access without doing any requests.
  console.log("Logged into", session.user.name, "studying at", session.user.resources[0].establishmentName, "in", session.user.resources[0].className);
  if (session.user.resources[0].profilePicture) {
    console.log("-> Profile Picture URL:", session.user.resources[0].profilePicture.url);
  }

  console.log(); // Break line.

  // If we need more, we can ask for it !
  const account = await pronote.account(session);

  console.log(`Lives at ${account.address[0]}, more precisely at ${account.city}, ${account.province || "(no province)"} in ${account.country || "(no country)"}.`);
  console.log(`Can be called at ${account.phone} and emailed at ${account.email}.`);
  console.log(); // Break line.

  console.log("-> INE:", account.INE);

  // This is the token that we can use to grab an iCal for the timetable.
  if (account.iCalToken) {
    console.log("-> Token iCal:", account.iCalToken);
    // Here's how we can grab the timetable URL from the token.
    // console.log("-> Timetable .ics URL:", pronote.getTimetableICalURL(account.iCalToken));
  }
}();
