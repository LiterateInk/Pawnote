import type { UserAuthorizations } from "./user-authorizations";
import type { Attachment } from "./attachment";
import { Tab } from "./tab";

export type UserParameters = Readonly<{
  id: string
  kind: number
  name: string

  authorizations: UserAuthorizations

  tabs: Map<number, Tab>

  profilePicture: Attachment | null

  establishmentName: string
  className: string

  isDelegate: boolean
  isMemberCA: boolean
}>;
