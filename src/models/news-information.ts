import { Attachment } from "./attachment";
import { NewsItem } from "./news-item";
import { NewsQuestion } from "./news-question";

export type NewsInformation = NewsItem & Readonly<{
  is: "information"

  get attachments(): Array<Attachment>
  /**
   * Whether this news have been acknowledged or not.
   * @remark This is not the same as reading the news, see `read` property.
   */
  get acknowledged(): boolean

  /**
   * Date when the news have been acknowledged.
   * Only available if `acknowledged` is `true`.
  */
  get acknowledgedDate(): Date | undefined

  get needToAcknowledge(): boolean
  get content(): string

  /**
   * Low level data about the "question" contained inside this information.
   *
   * Internally, `acknowledged`, `content`, `attachments`, ... are getters for this,
   * we're just renaming the properties to make the naming better.
   *
   * @remark Most of the time, you won't need this, but it's here if you need it.
   */
  question: NewsQuestion
}>;
