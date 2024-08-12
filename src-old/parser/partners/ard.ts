import { Partner } from "../partner";
import type Pronote from "~/client/Pronote";
import type { PronoteApiUserHomepage } from "~/api/user/homepage/types";

export class ARDPartnerWallet {
  readonly #name: string;
  readonly #description: string;
  readonly #warning: boolean;

  readonly #balance: number;
  readonly #balanceDescription: string;

  constructor (wallet: NonNullable<PronoteApiUserHomepage["response"]["donnees"]["partenaireARD"]>["porteMonnaie"]["V"][number]) {
    this.#name = wallet.libellePorteMonnaie;
    this.#description = wallet.hintPorteMonnaie;
    this.#warning = wallet.avecWarning;

    // Will turn `420,69 €` into `420.69`
    this.#balance = parseInt(wallet.valeurSolde.replace(",", "."));
    this.#balanceDescription = wallet.hintSolde;
  }

  public get name (): string {
    return this.#name;
  }

  public get description (): string {
    return this.#description;
  }

  public get warning (): boolean {
    return this.#warning;
  }

  public get balance (): number {
    return this.#balance;
  }

  public get balanceDescription (): string {
    return this.#balanceDescription;
  }
}

export class ARDPartner extends Partner {
  readonly #canRefreshData: boolean;
  readonly #wallets: ARDPartnerWallet[] = [];

  constructor (client: Pronote, ard: NonNullable<PronoteApiUserHomepage["response"]["donnees"]["partenaireARD"]>) {
    super(client, ard.SSO);
    this.#canRefreshData = ard.avecActualisation;

    for (const wallet of ard.porteMonnaie.V) {
      this.#wallets.push(new ARDPartnerWallet(wallet));
    }
  }

  public get canRefreshData (): boolean {
    return this.#canRefreshData;
  }

  public get wallets (): ARDPartnerWallet[] {
    return this.#wallets;
  }
}
