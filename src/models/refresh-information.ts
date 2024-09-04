import type { AccountKind } from "./account-kind";

export type RefreshInformation = Readonly<{
  url: string
  /**
   * Acts as a replacement for the password.
   * Whenever you need to authenticate, you should use this token
   * from now on if you want to avoid entering your password again.
   *
   * Note that this token is only valid for the `deviceUUID` you provided
   * in the authentication options.
   */
  token: string
  username: string
  kind: AccountKind
  navigatorIdentifier: string
}>;
