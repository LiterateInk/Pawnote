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

  for (const discussion of discussions.items) {
    console.group("Entering discussion:", discussion.subject);
    console.info(discussion.numberOfMessages, "message(s) including", discussion.numberOfMessagesUnread, "message(s) unread");

    if (discussion.numberOfMessagesUnread > 0) {
      await pronote.discussionRead(session, discussion);
      console.info("Marked the discussion as read !");
    }

    console.groupEnd();
  }
}();

