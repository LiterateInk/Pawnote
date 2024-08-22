import { DiscussionDraftMessage, DiscussionMessages, DiscussionSendAction, DiscussionSentMessage, SessionHandle } from "~/models";
import { decodeDiscussionDraftMessage } from "./discussion-draft-message";
import { decodeDiscussionSentMessage } from "./discussion-sent-message";

export const decodeDiscussionMessages = (messages: any, session: SessionHandle): DiscussionMessages => {
  const draft = messages.brouillon;
  const sents: DiscussionSentMessage[] = [];
  const drafts: DiscussionDraftMessage[] = [];
  const defaultReplyMessageID: string = messages.messagePourReponse.V.N;

  for (const message of messages.listeMessages.V) {
    if (message.brouillon) drafts.push(decodeDiscussionDraftMessage(message));
    else sents.push(decodeDiscussionSentMessage(message, session, sents));
  }

  sents.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

  if (draft) {
    const isHTML = draft.V.estHTML ?? false;

    drafts.push({
      isHTML,
      content: isHTML ? draft.V.contenu : draft.V.contenu.V,
      posessionID: draft.V.N,
      replyMessageID: defaultReplyMessageID
    });
  }

  const sendAction: DiscussionSendAction | undefined = messages.listeBoutons.V.find((button: any) => button.L.startsWith("Envoyer"))?.G;
  const canIncludeStudentsAndParents = sendAction === DiscussionSendAction.ReplyEveryoneExceptParentsAndStudents
                                    || sendAction === DiscussionSendAction.SendEveryoneExceptParentsAndStudents;

  return {
    sents,
    drafts,
    defaultReplyMessageID,
    sendAction,
    canIncludeStudentsAndParents
  };
};
