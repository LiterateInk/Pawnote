import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { FetchedMessageRecipient } from "~/parser/recipient";
import type { MessagesOverview } from "~/parser/messages";
import type Pronote from "~/client/Pronote";
import type Queue from "~/utils/queue";
import type { Session } from "~/session";
import { PronoteApiDiscussionCommandType, PronoteApiDiscussionFolderType } from "~/constants/discussion";
import { callApiUserDiscussions } from "~/api/user/discussions";

type UserDiscussionsOverview = PronoteApiUserDiscussions["response"]["donnees"];
type UserDiscussionMessages = UserDiscussionsOverview["listeMessagerie"]["V"][number];
type UserFolder = UserDiscussionsOverview["listeEtiquettes"]["V"][number];

export class StudentDiscussion {
  readonly #client: Pronote;
  readonly #discussionsOverview: StudentDiscussionsOverview;

  readonly #participantsMessageID: string;

  #permanentlyDeleted = false;
  #assertNotDeleted () {
    if (this.#permanentlyDeleted) {
      throw new Error(`This discussion (participantsMessageID=${this.#participantsMessageID}) has been permanently deleted. You can't use this discussion instance anymore.`);
    }
  }

  public async refetch (): Promise<void> {
    // Will be automatically assigned inside overview data and accessible through `readData()`.
    await this.#discussionsOverview.refetch();
  }

  public constructor (
    client: Pronote,
    data: () => UserDiscussionMessages,
    discussionsOverview: StudentDiscussionsOverview
  ) {
    this.#client = client;
    this.#discussionsOverview = discussionsOverview;

    this.#readData = () => {
      this.#assertNotDeleted();
      return data();
    };

    const actualData = data();

    this.#dateAsFrenchText = actualData.libelleDate!;
    this.#recipientName = actualData.public;

    this.#creator = actualData.initiateur ?? this.#client.studentName;

    // Always exist in `data`, safe to non-null.
    this.#participantsMessageID = actualData.messagePourParticipants!.V.N;
  }

  /**
   * Fetches the messages from the discussion.
   * By default it won't mark the messages as read even after fetching them.
   *
   * You can change this behavior by setting `markAsRead` to `true`.
   * There's no other way to mark the messages as read.
   *
   * @param markAsRead Whether to mark the messages as read after fetching them.
   * @param limit - 0 = no limit, fetch all messages.
   */
  public fetchMessagesOverview (markAsRead = false, limit = 0): Promise<MessagesOverview> {
    return this.#client.getMessagesOverviewFromDiscussion(this, markAsRead, limit);
  }

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
