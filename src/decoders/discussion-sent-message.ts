import { DiscussionMessage, DiscussionSentMessage, SessionHandle } from "~/models";
import { decodeDiscussionMessage } from "./discussion-message";

export const decodeDiscussionSentMessage = (message: any, session: SessionHandle, sents: DiscussionSentMessage[]): DiscussionSentMessage => {
  const transferredMessages: DiscussionMessage[] = [];
  const replyMessageID: string = message.messageSource.V.N;

  if (message.listeMessagesPourContexte) {
    for (const transferredMessage of message.listeMessagesPourContexte.V) {
      const decoded = decodeDiscussionMessage(transferredMessage, session);
      transferredMessages.push(decoded);
    }
  }

  let replyingTo = sents.find((message) => message.id === replyMessageID);

  return {
    ...decodeDiscussionMessage(message, session),
    transferredMessages,
    replyMessageID,
    replyingTo
  };
};
