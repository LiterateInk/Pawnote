import type { PartnerARDWallet } from "~/models";

export const decodePartnerARDWallet = (wallet: any): PartnerARDWallet => ({
  name: wallet.libellePorteMonnaie,
  description: wallet.hintPorteMonnaie,
  warning: wallet.avecWarning,
  // Will turn `420,69 €` into `420.69`
  balance: parseInt(wallet.valeurSolde.replace(",", ".")),
  balanceDescription: wallet.hintSolde
});
