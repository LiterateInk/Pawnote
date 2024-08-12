import { PronoteSSO } from "~/constants/partner";
import Pronote from "~/client/Pronote";

export class Partner {
  readonly #client: Pronote;

  public constructor (
    client: Pronote,
    public readonly sso: PronoteSSO
  ) {
    this.#client = client;
  }

  public async fetchURL (): Promise<string> {
    return this.#client.getPartnerURL(this);
  }
}
