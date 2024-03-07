import type { PronoteApiUserCreateDiscussionRecipients } from "~/api/user/createDiscussionRecipients/types";
import type { PronoteApiUserMessageRecipient } from "~/constants/recipients";
import type { PronoteApiUserResourceType } from "~/constants/users";

export class BaseRecipient {
  readonly #name: string;
  readonly #type: PronoteApiUserResourceType;

  constructor (data: Omit<PronoteApiUserMessageRecipient, "N" | "P" | "refusMess">) {
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

export class FetchedMessageRecipient extends BaseRecipient {
  readonly #id: string;
  readonly #refuseMessages: boolean;

  constructor (data: PronoteApiUserMessageRecipient) {
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

  public get name (): string {
    return this.#name;
  }

  public get sub (): DiscussionCreationRecipientSubResource[] {
    return this.#sub;
  }
}

export class DiscussionCreationRecipient extends BaseRecipient {
  readonly #id: string;
  readonly #isPrincipal: boolean;
  readonly #subjects: Array<DiscussionCreationRecipientResource>;

  constructor (data: PronoteApiUserCreateDiscussionRecipients["response"]["donnees"]["listeRessourcesPourCommunication"]["V"][number]) {
    super(data);

    const sub = data.listeRessources.V.filter((r) => r.estUneSousMatiere).map((r) => new DiscussionCreationRecipientSubResource(r));
    this.#subjects = data.listeRessources.V
      .filter((r) => !r.estUneSousMatiere)
      .map((r) => new DiscussionCreationRecipientResource(r, sub.filter((s) => s.from === r.L)));

    this.#isPrincipal = data.estPrincipal ?? false;
    this.#id = data.N;
  }

  public get id (): string {
    return this.#id;
  }

  public get isPrincipal (): boolean {
    return this.#isPrincipal;
  }

  public get subjects (): Array<DiscussionCreationRecipientResource> {
    return this.#subjects;
  }
}
