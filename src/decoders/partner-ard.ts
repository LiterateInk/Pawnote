import type { PartnerARD } from "~/models";
import { decodePartner } from "./partner";
import { decodePartnerARDWallet } from "./partner-ard-wallet";

export const decodePartnerARD = (partner: any): PartnerARD => {
  return {
    ...decodePartner(partner),
    canRefreshData: partner.avecActualisation,
    wallets: partner.porteMonnaie.V.map(decodePartnerARDWallet)
  };
};
