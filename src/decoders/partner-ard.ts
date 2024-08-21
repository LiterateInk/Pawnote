import type { PartnerARD } from "~/models";
import { decodePartnerARDWallet } from "./partner-ard-wallet";
import { decodePartner } from "./partner";

export const decodePartnerARD = (partner: any): PartnerARD => {
  return {
    ...decodePartner(partner),
    canRefreshData: partner.avecActualisation,
    wallets: partner.porteMonnaie.V.map(decodePartnerARDWallet)
  };
};
