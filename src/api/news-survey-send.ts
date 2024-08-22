import type { NewsSurvey, SessionHandle } from "~/models";
import { newsRemoteMutate } from "./private/news-remote-mutate";

/**
 * Answers the survey with the given answers.
 * By default, it'll answer with the questions that were given when the survey was created.
 *
 * You can either manipulate the questions directly or pass in your own answers.
 */
export const newsSurveySend = async (session: SessionHandle, survey: NewsSurvey, alsoMarkAsRead = true): Promise<void> => {
  await newsRemoteMutate(session, survey, {
    markAsRead: alsoMarkAsRead,
    onlyMarkAsRead: false,
    delete: false
  });

  if (alsoMarkAsRead)
    survey.read = true;
};
