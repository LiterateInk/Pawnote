import type { Discussion, DiscussionFolder, SessionHandle } from "~/models";

export const decodeDiscussion = (discussion: any, session: SessionHandle, folders: DiscussionFolder[]): Discussion => {
  return {
    creator: discussion.initiateur,
    dateAsFrenchText: discussion.libelleDate,
    recipientName: discussion.public,
    participantsMessageID: discussion.messagePourParticipants.V.N,
    possessions: discussion.listePossessionsMessages.V,
    numberOfDrafts: discussion.nbBrouillons ?? 0,
    subject: discussion.objet ?? "",
    numberOfMessages: discussion.nombreMessages ?? 0,
    numberOfMessagesUnread: discussion.nbNonLus ?? 0,
    closed: discussion.ferme ?? false,
    folders: discussion.listeEtiquettes?.V
      .map((current: any) =>
        folders.find((decoded) => decoded.id === current.N)
      )
      .filter(Boolean) ?? []
  };
};
