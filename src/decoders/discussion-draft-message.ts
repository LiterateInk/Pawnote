import type { DiscussionDraftMessage } from "~/models";

export const decodeDiscussionDraftMessage = (draft: any): DiscussionDraftMessage => {
  const isHTML: boolean = draft.estHTML ?? false;

  return {
    possessionID: draft.possessionMessage.V.N,
    replyMessageID: draft.messageSource.V.N,
    content: isHTML ? draft.contenu.V : draft.contenu,
    isHTML
  };
};
