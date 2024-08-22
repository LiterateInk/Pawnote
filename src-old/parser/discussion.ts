import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { FetchedMessageRecipient } from "~/parser/recipient";
import { PronoteApiDiscussionCommandType, PronoteApiDiscussionFolderType } from "~/constants/discussion";

type UserDiscussionsOverview = PronoteApiUserDiscussions["response"]["donnees"];
type UserDiscussionMessages = UserDiscussionsOverview["listeMessagerie"]["V"][number];
type UserFolder = UserDiscussionsOverview["listeEtiquettes"]["V"][number];

export class StudentDiscussion {
  /**
   * Marks the discussion as read.
   * @remark This function is a shortcut to `fetchMessages(true)` but here we don't return anything.
   */
  public markAsRead (): Promise<void> {
    return this.#client.markDiscussionAsRead(this);
  }

  /**
   * Fetches the recipients of the discussion.
   * A recipient is someone who is part of the discussion.
   * They don't have to send a message to be considered as a recipient.
   */
  public fetchRecipients (): Promise<FetchedMessageRecipient[]> {
    this.#assertNotDeleted();
    return this.#client.getRecipientsForMessage(this.#participantsMessageID);
  }

  public async moveToTrash (): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.corbeille,
      possessions: this.possessions
    });
  }

  public async restoreFromTrash (): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.restauration,
      possessions: this.possessions
    });
  }

  public async deletePermanently (): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.suppression,
      possessions: this.possessions
    });
  }
}
