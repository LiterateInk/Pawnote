import type { AccountKind } from "./account-kind";

export type RefreshInformation = Readonly<{
  token: string

  username: string
  kind: AccountKind
}>;
