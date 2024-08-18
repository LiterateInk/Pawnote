import type { Attachment } from "./attachment";
import type { Tab } from "./tab";

export type UserResource = Readonly<{
  id: string
  kind: number
  name: string
  className: string
  establishmentName: string
  profilePicture: Attachment | null
  isDelegate: boolean
  isMemberCA: boolean
  tabs: Map<number, Tab>
}>;
