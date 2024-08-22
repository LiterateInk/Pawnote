import type { Discussion, DiscussionFolder } from "~/models";

export const decodeDiscussion = (discussion: any, folders: DiscussionFolder[], cache: Record<string, Discussion>): Discussion => {
  return {
    cache,
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
    permanentlyDeleted: false,
    folders: discussion.listeEtiquettes?.V
      .map((current: any) =>
        folders.find((decoded) => decoded.id === current.N)
      )
      .filter(Boolean) ?? []
  };
};
