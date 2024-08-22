import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { FetchedMessageRecipient } from "~/parser/recipient";
import { PronoteApiDiscussionCommandType, PronoteApiDiscussionFolderType } from "~/constants/discussion";

type UserDiscussionsOverview = PronoteApiUserDiscussions["response"]["donnees"];
type UserDiscussionMessages = UserDiscussionsOverview["listeMessagerie"]["V"][number];
type UserFolder = UserDiscussionsOverview["listeEtiquettes"]["V"][number];

export class StudentDiscussion {
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
