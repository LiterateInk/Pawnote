import type { PronoteApiUserCreateDiscussionRecipients } from "~/api/user/createDiscussionRecipients/types";
import type { PronoteApiUserMessageRecipient } from "~/constants/recipients";
import type { PronoteApiUserResourceType } from "~/constants/users";

export class MessageRecipient {
  readonly #name: string;
  readonly #type: PronoteApiUserResourceType;

  public constructor (data: Omit<PronoteApiUserMessageRecipient, "N" | "P" | "refusMess">) {
    this.#name = data.L;
    this.#type = data.G;
  }

  public get name (): string {
    return this.#name;
  }

  public get type (): PronoteApiUserResourceType {
    return this.#type;
  }
}

export class FetchedMessageRecipient extends MessageRecipient {
  readonly #id: string;
  readonly #refuseMessages: boolean;

  public constructor (data: PronoteApiUserMessageRecipient) {
    super(data);
    this.#id = data.N;
    this.#refuseMessages = data.refusMess ?? false;
  }

  public get id (): string {
    return this.#id;
  }

  public get refuseMessages (): boolean {
    return this.#refuseMessages;
  }
}

class DiscussionCreationRecipientSubResource {
  readonly #id: string;
  readonly #name: string;
  readonly #from: string;

  constructor(data: PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["listeRessources"]["V"][number]) {
    this.#id = data.N;
    this.#name = data.L;
    this.#from = data.libelleMatiere;
  }

  public get id (): string {
    return this.#id;
  }

  public get name (): string {
    return this.#name;
  }

  public get from (): string {
    return this.#from;
  }
}

class DiscussionCreationRecipientResource {
  readonly #id: string;
  readonly #name: string;
  readonly #sub: DiscussionCreationRecipientSubResource[];

  constructor(data: PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["listeRessources"]["V"][number], sub: DiscussionCreationRecipientSubResource[]) {
    this.#id = data.N;
    this.#name = data.L;
    this.#sub = sub;
  }

  public get id (): string {
    return this.#id;
  }

class DiscussionCreationRecipientFunction {
  public readonly id: string;
  public readonly name: string;

  constructor (data: NonNullable<PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]["fonction"]>["V"]) {
    this.id = data.N;
    this.name = data.L;
  }
}

export class DiscussionCreationRecipient extends MessageRecipient {
  public readonly id: string;
  public readonly isPrincipal: boolean;
  public readonly subjects: Array<DiscussionCreationRecipientResource> = [];
  public readonly function?: DiscussionCreationRecipientFunction;

  constructor (data: PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]) {
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
