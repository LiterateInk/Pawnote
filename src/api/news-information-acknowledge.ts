import type { NewsInformation, SessionHandle } from "~/models";
import { newsRead } from "./news-read";
import { newsQuestionLocalMutate } from "./helpers/news-question-local-mutate";
import { newsRemoteMutate } from "./private/news-remote-mutate";

/**
   * Will acknowledge the news if needed,
   * so if the news doesn't need to be acknowledged (`!needToAcknowledge`)
   * or is already `acknowledged`, we will just do the read step.
   *
   * When acknowledging, the news will be directly marked as read.
   * If you want to change this behavior, you can change the `alsoMarkAsRead` parameter.
   *
   * @remark You can't un-acknowledge a news.
   */
export const newsInformationAcknowledge = async (session: SessionHandle, information: NewsInformation, alsoMarkAsRead = true): Promise<void> => {
  if (!information.needToAcknowledge || information.acknowledged)
    return newsRead(session, information, alsoMarkAsRead);

  // An empty string is needed to acknowledge.
  newsQuestionLocalMutate(information.question, "");

  await newsRemoteMutate(session, information, {
    markAsRead: alsoMarkAsRead,
    onlyMarkAsRead: false,
    delete: false
  });

  if (alsoMarkAsRead)
    information.read = true;
};
