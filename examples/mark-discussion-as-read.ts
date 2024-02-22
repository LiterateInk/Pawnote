import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Eleve,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const { discussions } = await pronote.getDiscussionsOverview();

  for (const discussion of discussions) {
    console.group("Entering discussion:", discussion.subject);
    console.info(discussion.numberOfMessages, "message(s) including", discussion.numberOfMessagesUnread, "message(s) unread");

    if (discussion.numberOfMessagesUnread > 0) {
      await discussion.markAsRead();
      console.info("Marked the discussion as read !");
    }

    console.groupEnd();
  }
})();

