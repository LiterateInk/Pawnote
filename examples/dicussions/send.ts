import { authenticatePronoteCredentials, PronoteApiAccountId } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  // You can do those checks manually, they're also done internally and will throw an error if the account can't do this.
  if (!pronote.authorizations.canDiscuss) throw new Error("This account can't discuss, review the permissions.");
  if (!pronote.authorizations.canDiscussWithTeachers) throw new Error("This account can't discuss with teachers, review the permissions.");

  // Get an overview of available discussions.
  const discussionsOverview = await pronote.getDiscussionsOverview();
  // Select the first discussion available.
  const firstDiscussion = discussionsOverview.discussions[0];

  // Fetch the messages overview from the discussion.
  // You need to fetch the overview in order to send a message.
  const messagesOverview = await firstDiscussion.fetchMessagesOverview();
  console.info("Sending to the discussion:", firstDiscussion.subject);
  console.log("Currently containing", messagesOverview.messages.length, "message(s)...");

  // Send a message to the discussion.
  // Using this method directly on the overview will reply to the latest message.
  await messagesOverview.sendMessage("Hello, I'm replying to the latest message using Pawnote !");

  // But you can also select a message to reply to.
  await messagesOverview.messages[0].reply("Hello, I'm replying to the first message using Pawnote !");
  // Or do the following : await messagesOverview.sendMessage("...", messagesOverview.messages[0].id);

  console.info("Two messages sent to:", firstDiscussion.subject);
  // `messagesOverview.messages` is automatically updated after sending a message.
  console.log("Discussion have", messagesOverview.messages.length, "messages now !");
})();

