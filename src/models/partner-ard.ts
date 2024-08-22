import type { Partner } from "./partner";
import type { PartnerARDWallet } from "./partner-ard-wallet";

export type PartnerARD = Partner & Readonly<{
  canRefreshData: boolean
  wallets: PartnerARDWallet[]
}>;
