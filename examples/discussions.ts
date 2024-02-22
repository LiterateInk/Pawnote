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

    console.info(
      "This discussion is", discussion.closed ? "closed" : "still opened",
      "and located in the folder", discussion.folders.map((folder) => folder.name).join(", ") || "(no folder)"
    );

    const messages = await discussion.fetchMessages();
    console.log("\n--- Messages (most recent first)\n"); // Line break for contents.

    for (const message of messages) {
      const receiver = message.receiver ?? `(${message.amountOfRecipients} people)`;
      const recipients = await message.getRecipients();

      console.log(`[${message.created.toLocaleString()}]`, message.author, "to", receiver);
      console.log("Partial visibility:", message.partialVisibility ? "yes" : "no");
      console.log("Actual recipients:", recipients.join(", ") || "(no recipient)");
      console.log(message.content);

      for (const file of message.files) {
        console.log("(attachment):", file.name, "=>", file.url);
      }

      console.log(); // Line break.
    }

    console.groupEnd();
  }
})();

