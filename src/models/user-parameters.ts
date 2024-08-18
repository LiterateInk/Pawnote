import type { UserAuthorizations } from "./user-authorizations";
import type { UserResource } from "./user-resource";

export type UserParameters = Readonly<{
  id: string
  kind: number
  name: string

  authorizations: UserAuthorizations
  resources: Array<UserResource>
}>;
