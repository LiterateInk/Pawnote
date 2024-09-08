import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  if (!session.user.authorizations.canDiscuss)
    throw new Error("This account can't discuss, review the permissions.");

  type Kinds = (
    | typeof pronote.EntityKind.Teacher
    | typeof pronote.EntityKind.Personal
    | typeof pronote.EntityKind.Student
  );

  const kinds: Kinds[] = [];

  if (session.user.authorizations.canDiscussWithStaff) {
    console.info("+ Personal");
    kinds.push(pronote.EntityKind.Personal);
  }

  if (session.user.authorizations.canDiscussWithTeachers) {
    console.info("+ Teacher");
    kinds.push(pronote.EntityKind.Teacher);
  }

  if (session.user.authorizations.canDiscussWithStudents) {
    console.info("+ Student");
    kinds.push(pronote.EntityKind.Student);
  }

  const recipients = await Promise.all(kinds.map((kind) => pronote.newDiscussionRecipients(session, kind)));
  const people = recipients.flat();

  for (const person of people) {
    console.info(); // New line.
    let typeName = "unknown";

    if (person.kind === pronote.EntityKind.Personal) typeName = "staff";
    else if (person.kind === pronote.EntityKind.Teacher) typeName = "teacher";
    else if (person.kind === pronote.EntityKind.Student) typeName = "student";

    console.info(`(${typeName}): ${person.name}`);

    if (person.function) console.info("=>", person.function.name);
    if (person.subjects.length > 0) console.info("=>", person.subjects.map((subject) => subject.name).join(", "));
  }
}();
