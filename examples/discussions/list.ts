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

  // Get an overview of available discussions.
  const discussions = await pronote.discussions(session);

  // Select the first discussion available.
  const firstDiscussion = discussions.items[0];
  console.log("Selected discussion:", firstDiscussion.subject);

  // Fetch the messages overview from the discussion.
  // You need to fetch the overview in order to send a message.
  const messagesOverview = await firstDiscussion.fetchMessagesOverview();
  console.info(firstDiscussion.subject);
  console.log("Currently containing", messagesOverview.messages.length, "message(s)...");
}();

