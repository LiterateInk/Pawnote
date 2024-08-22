import { Attachment } from "./attachment";
import { DiscussionMessageRecipient } from "./discussion-message-recipient";

export type DiscussionMessage = Readonly<{
  id: string
  content: string
  creationDate: Date
  /**
   * When undefined, the author is the user itself.
   */
  author?: DiscussionMessageRecipient
  /**
   * When undefined, the receiver is the user itself.
   */
  receiver?: DiscussionMessageRecipient
  partialVisibility: boolean
  amountOfRecipients: number
  files: Attachment[]
}>;
