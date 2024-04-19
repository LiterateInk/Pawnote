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
  console.info("Opening discussion:", firstDiscussion.subject);
  console.log("Containing", firstDiscussion.numberOfDrafts, "draft(s)...");
  console.log("Containing", firstDiscussion.numberOfMessages - firstDiscussion.numberOfDrafts, "message(s)...");

  // Fetch the messages overview from the discussion.
  // You need to fetch the overview in order to send a message.
  const messagesOverview = await firstDiscussion.fetchMessagesOverview();

  for (const draft of messagesOverview.savedDrafts) {
    console.log("Draft:", draft.possessionID);
    draft.content = "This is a new content for the draft." + Date.now() + draft.content;
    await draft.save();
  }
})();

