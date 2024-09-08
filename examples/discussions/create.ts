import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  if (!session.user.authorizations.canDiscuss)
    throw new Error("This account can't discuss, review the permissions.");

  const teachers = await pronote.newDiscussionRecipients(session, pronote.EntityKind.Teacher);
  console.info("Sending a message to every teachers:", teachers.map((teacher) => teacher.name).join(", "));

  await pronote.newDiscussion(
    session,
    // Enter the subject of the discussion.
    `Hello World, ${Date.now()} !`,

    // Enter the content of the first message.
    // Note that this will be sent as HTML when
    // `session.user.authorizations.hasAdvancedDiscussionEditor === true`
    // otherwise, it's all plain text.
    `
We're currently ${new Date().toLocaleDateString()}

This is a message sent over Pawnote !
Don't forget to star the project on GitHub :)
    `.trim(),

    // Finally, give the recipients that will receive that first message.
    teachers
  );

  console.info("Done ! Hope they'll like this cute message.");
}();

