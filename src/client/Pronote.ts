import { ApiLoginInformations } from "../api/login/informations/types";
import { ApiUserData } from "../api/user/data/types";
import type { NextAuthenticationCredentials } from "../authenticate/types";
import { Session } from "../session";

export default class Pronote {
  constructor (
    private session: Session,
    private credentials: NextAuthenticationCredentials,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"],
    private loginInformations: ApiLoginInformations["output"]["data"]
  ) {}

  /**
   * Username that SHOULD be used for any further authentication.
   */
  public get username (): string {
    return this.credentials.username;
  }

  /**
   * Acts as a replacement for the password.
   * Whenever you need to authenticate, you should use this token
   * from now on if you want to avoid entering your password again.
   * 
   * Note that this token is only valid for the `deviceUUID` you provided
   * in the authentication options.
   */
  public get nextTimeToken (): string {
    return this.credentials.token;
  }

  /**
   * Whether the Pronote instance you're connected to
   * is a demonstration server or not.
   * 
   * `authenticateToken` won't work against them since
   * next-time tokens aren't saved, even though
   * it's able to generate them.
   */
  public get isDemo (): boolean {
    return this.session.instance.demo;
  }
}