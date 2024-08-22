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

  if (!session.user.authorizations.canDiscussWithTeachers)
    throw new Error("This account can't discuss with teachers, review the permissions.");

  const discussions = await pronote.discussions(session);

  // Select the first discussion available.
  const discussion = discussions.items[0];

  console.info("Opening discussion:", discussion.subject);
  console.log("Containing", discussion.numberOfDrafts, "draft(s) !");

  // Fetch the messages from the discussion.
  const messages = await pronote.discussionMessages(session, discussion);

  for (const draft of messages.drafts) {
    await pronote.discussionSendDraft(session, discussion, draft);
    console.log("Draft sent:", draft.possessionID);
  }
}();
