import { PronoteSSO } from "~/constants/partner";
import Pronote from "~/client/Pronote";

export class Partner {
  readonly #client: Pronote;
  readonly #code: string;
  readonly #description: string;
  readonly #linkLabel: string;

  public constructor (client: Pronote, sso: PronoteSSO) {
    this.#client = client;
    this.#code = sso.codePartenaire;
    this.#description = sso.description;
    this.#linkLabel = sso.intituleLien;
  }

  public async fetchURL (): Promise<string> {
    return this.#client.getPartnerURL(this);
  }

  public get code (): string {
    return this.#code;
  }

  public get description (): string {
    return this.#description;
  }

  public get linkLabel (): string {
    return this.#linkLabel;
  }
}
