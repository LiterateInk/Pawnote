import type { NewsInformation, NewsItem, NewsSurvey, SessionHandle } from "~/models";
import { newsRemoteMutate } from "./private/news-remote-mutate";

/**
 * Will delete the item from the user's news feed.
 * @remark You can never get the item back after this.
 */
export const newsDelete = async (session: SessionHandle, item: NewsInformation | NewsSurvey): Promise<void> => {
  await newsRemoteMutate(session, item, {
    onlyMarkAsRead: false,
    markAsRead: false,
    delete: true
  });
};
