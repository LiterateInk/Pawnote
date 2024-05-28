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

  type PronoteApiUserResource = PronoteApiResourceType.Teacher | PronoteApiResourceType.Personal | PronoteApiResourceType.Student;
  const types: PronoteApiUserResource[] = [];

  if (pronote.authorizations.canDiscussWithStaff) {
    console.info("+ staff");
    types.push(PronoteApiResourceType.Personal);
  }

  if (pronote.authorizations.canDiscussWithTeachers) {
    console.info("+ teachers");
    types.push(PronoteApiResourceType.Teacher);
  }

  console.info("-> Fetching...");
  const recipients = await Promise.all(types.map((type) => pronote.getRecipientsForDiscussionCreation(type)));
  console.info("---");

  const people = recipients.flat();

  for (const person of people) {
    let typeName = "unknown";

    if (person.type === PronoteApiResourceType.Personal) typeName = "staff";
    else if (person.type === PronoteApiResourceType.Teacher) typeName = "teacher";
    else if (person.type === PronoteApiResourceType.Student) typeName = "student";

    console.info(`(${typeName}): ${person.name}`);

    if (person.function) console.info("=>", person.function.name);
    if (person.subjects.length > 0) console.info("=>", person.subjects.map((subject) => subject.name).join(", "));

    // Break.
    console.info();
  }
})();
