import type { AccountKind } from "./account-kind";

export type AuthenticationQR = Readonly<{
  url: string
  token: string
  username: string
  kind: AccountKind
}>;
