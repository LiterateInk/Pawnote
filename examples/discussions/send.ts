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

  // Fetch the messages from the discussion.
  const messages = await pronote.discussionMessages(session, discussion);
  console.info("Sending to the discussion:", discussion.subject, "made by", discussion.creator ?? "myself", "to", discussion.recipientName ?? "myself");
  console.log("Currently containing", messages.sents.length, "message(s)...");

  // Send a message to the discussion.
  // Using this method directly on the overview will reply to the latest message.
  await pronote.discussionSendMessage(session, discussion, "Hello, I'm replying to the latest message using Pawnote !");

  const firstMessage = messages.sents[messages.sents.length - 1];

  // But you can also select a message to reply to.
  await pronote.discussionSendMessage(session, discussion, `Hello, I'm replying to the first message in history (${firstMessage.content.replaceAll("\n", "<br>")}) using Pawnote !`, false, firstMessage.id);
  // `messages` is automatically updated after sending a message.
  console.log("Discussion have", messages.sents.length, "messages now !");
}();

