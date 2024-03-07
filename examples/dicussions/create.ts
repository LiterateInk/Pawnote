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
  for (const teacher of teachers) {
    console.log(teacher.name, teacher.isPrincipal, teacher.subjects.map((r) => r.sub));
  }
})();

