import { DiscussionMessage, EntityKind, SessionHandle } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { DiscussionMessageRecipient } from "~/models/discussion-message-recipient";
import { decodeAttachment } from "./attachment";

const hintToEntity = (hint: string): EntityKind => {
  let type: EntityKind;

  switch (hint) {
    case "Professeur":
      type = EntityKind.Teacher;
      break;
    case "Personnel":
      type = EntityKind.Personal;
      break;
    default:
      type = EntityKind.Student;
  }

  return type;
};

export const decodeDiscussionMessage = (message: any, session: SessionHandle): DiscussionMessage => {
  let author: DiscussionMessageRecipient | undefined;

  if (message.public_gauche !== "Moi")
    author = { name: message.public_gauche, kind: hintToEntity(message.hint_gauche) };

  let receiver: DiscussionMessageRecipient | undefined;

  if (message.public_droite === "Moi")
    receiver = undefined;
  else if (typeof message.public_droite === "string")
    receiver = { name: message.public_droite, kind: hintToEntity(message.hint_droite) };

  return {
    id: message.N,
    content: message.estHTML ? message.contenu.V : message.contenu,
    creationDate: decodePronoteDate(message.date.V),
    author, receiver,
    partialVisibility: message.estUnAparte,
    amountOfRecipients: (message.nbPublic ?? 1) + 1, // `+1` because the author is also a recipient.
    files: message.listeDocumentsJoints?.V.map((attachment: any) => decodeAttachment(attachment, session)) ?? []
  };
};
