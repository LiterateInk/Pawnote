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
      // Author is undefined when the message is sent by the student.
      const author = message.author ?? "(me)";
      // Receiver is undefined when the message is sent to the student.
      // So to know if the message was sent to multiple people, we can check if the amount of recipients is greater than 1.
      // Otherwise, we can just assume it was sent to the student.
      const receiver = message.receiver ?? (
        message.amountOfRecipients === 1
          ? "(me)"
          : `(${message.amountOfRecipients} people)`
      );

      console.log(`[${message.created.toLocaleString()}]`, author, "to", receiver);
      console.log(message.content);

      console.log(); // Line break.
    }

    console.groupEnd();
  }
})();

