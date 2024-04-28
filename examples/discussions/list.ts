import { authenticatePronoteCredentials, PronoteApiAccountId } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  // Get an overview of available discussions.
  const discussionsOverview = await pronote.getDiscussionsOverview();
  // Select the first discussion available.
  const firstDiscussion = discussionsOverview.discussions[0];

  // Fetch the messages overview from the discussion.
  // You need to fetch the overview in order to send a message.
  const messagesOverview = await firstDiscussion.fetchMessagesOverview();
  console.info(firstDiscussion.subject);
  console.log("Currently containing", messagesOverview.messages.length, "message(s)...");
})();

