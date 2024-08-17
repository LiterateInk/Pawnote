import type { AccountKind } from "./account-kind";

export type RefreshInformation = Readonly<{
  url: string
  token: string
  username: string
  kind: AccountKind
}>;
