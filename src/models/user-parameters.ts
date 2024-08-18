import type { Attachment } from "./attachment";
import type { UserAuthorizations } from "./user-authorizations";

export type UserParameters = Readonly<{
  id: string
  kind: number
  name: string

  authorizations: UserAuthorizations

  /**
  * @remark Was named `onglets` in previous versions.
  */
  tabs: Tab[]
  periodsByTab: any // TODO

  profilePicture: Attachment | null

  establishmentName: string
  className: string

  isDelegate: boolean
  isMemberCA: boolean
}>;
