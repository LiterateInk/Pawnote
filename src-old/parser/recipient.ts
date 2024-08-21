import type { PronoteApiUserCreateDiscussionRecipients } from "~/api/user/createDiscussionRecipients/types";
import type { PronoteApiUserMessageRecipient } from "~/constants/recipients";
import type { PronoteApiUserResourceType } from "~/constants/users";

export class MessageRecipient {
  public readonly name: string;
  public readonly type: PronoteApiUserResourceType;

  public constructor (data: Omit<PronoteApiUserMessageRecipient, "N" | "P" | "refusMess">) {
    this.name = data.L;
    this.type = data.G;
  }
}

export class FetchedMessageRecipient extends MessageRecipient {
  public readonly id: string;
  public readonly refuseMessages: boolean;

  public constructor (data: PronoteApiUserMessageRecipient) {
    super(data);
    this.id = data.N;
    this.refuseMessages = data.refusMess ?? false;
  }
}
