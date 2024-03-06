import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiResourceType } from "../../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://demo.index-education.net/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "demonstration",
    password: "pronotevs",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  if (!pronote.authorizations.canDiscuss) throw new Error("This account can't discuss, review the permissions.");
  const teachers = await pronote.getRecipientsForDiscussionCreation(PronoteApiResourceType.Teacher);
  for (const teacher of teachers) {
    console.log(teacher.L, teacher.estPrincipal ?? false, teacher.listeRessources.V.map((r) => r.L));
  }
})();

