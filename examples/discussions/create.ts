import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiResourceType } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  if (!pronote.authorizations.canDiscuss) throw new Error("This account can't discuss, review the permissions.");
  const teachers = await pronote.getRecipientsForDiscussionCreation(PronoteApiResourceType.Teacher);
  console.info("Sending a message to every teachers:", teachers.map((teacher) => teacher.name).join(", "));

  await pronote.createDiscussion(
    // Enter the subject of the discussion.
    `Hello World, ${Date.now()} !`,

    // Enter the content of the first message.
    // Note that this will be sent as HTML when
    // `pronote.authorizations.hasAdvancedDiscussionEditor === true`
    // otherwise, it's all plain text.
    `
We're currently ${new Date().toLocaleDateString()}

This is a message sent over Pawnote !
Don't forget to star the project on GitHub :p
    `.trim(),

    // Finally, give the recipients that will receive that first message.
    teachers
  );

  console.info("Done ! Hope they'll like this cute message.");
})();

