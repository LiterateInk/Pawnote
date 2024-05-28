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

class DiscussionCreationRecipientSubResource {
  public readonly id: string;
  public readonly name: string;
  public readonly from: string;

  public constructor (data: NonNullable<PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["listeRessources"]>["V"][number]) {
    this.id = data.N;
    this.name = data.L;
    this.from = data.libelleMatiere;
  }
}

class DiscussionCreationRecipientResource {
  public readonly id: string;
  public readonly name: string;
  public readonly sub: DiscussionCreationRecipientSubResource[];

  public constructor (data: NonNullable<PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["listeRessources"]>["V"][number], sub: DiscussionCreationRecipientSubResource[]) {
    this.id = data.N;
    this.name = data.L;
    this.sub = sub;
  }
}

class DiscussionCreationRecipientFunction {
  public readonly id: string;
  public readonly name: string;

  public constructor (data: NonNullable<PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["fonction"]>["V"]) {
    this.id = data.N;
    this.name = data.L;
  }
}

export class DiscussionCreationRecipient extends MessageRecipient {
  public readonly id: string;
  public readonly isPrincipal: boolean;
  public readonly subjects: Array<DiscussionCreationRecipientResource> = [];
  public readonly function?: DiscussionCreationRecipientFunction;

  public constructor (data: PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]) {
    super(data);

    if (data.listeRessources) {
      const sub = data.listeRessources.V.filter((r) => r.estUneSousMatiere).map((r) => new DiscussionCreationRecipientSubResource(r));

      for (const resource of data.listeRessources.V) {
        if (resource.estUneSousMatiere) continue;
        this.subjects.push(new DiscussionCreationRecipientResource(resource, sub.filter((s) => s.from === resource.L)));
      }
    }

    if (data.fonction) {
      this.function = new DiscussionCreationRecipientFunction(data.fonction.V);
    }

    this.isPrincipal = data.estPrincipal ?? false;
    this.id = data.N;
  }
}
