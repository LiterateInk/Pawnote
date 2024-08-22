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

  const discussions = await pronote.discussions(session);

  // Select the first discussion available.
  const discussion = discussions.items[0];
  console.log("Selected discussion:", discussion.subject);

  // Fetch the messages overview from the discussion.
  const messages = await pronote.discussionMessages(session, discussion);
  console.log("Currently containing", messages.sents.length, "message(s)...");

  const recipients = await pronote.discussionRecipients(session, discussion);
  console.log("Recipients:", recipients.map((r) => r.name).join(", "));
}();

