import type { NewsCategory } from "./news-category";

export type NewsItem = Readonly<{
  id: string;
  title?: string;
  category: NewsCategory;

  creationDate: Date;
  startDate: Date;
  endDate: Date;

  /**
   * Name of the author of the information / survey.
   * @example "John D."
   */
  author: string;

  /**
   * Low level data about the public information of the user that'll send answers.
   * Used internally when sending answers to the server.
   *
   * Most of the time, you won't need this.
   */
  public: any
}> & {
  /**
   * Whether this news have been read or not.
   */
  read: boolean
};
