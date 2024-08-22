import type { Attachment } from "./attachment";
import type { Tab } from "./tab";
import type { TabLocation } from "./tab-location";

export type UserResource = Readonly<{
  id: string
  kind: number
  name: string
  className?: string
  establishmentName: string
  profilePicture: Attachment | null
  isDirector: boolean
  isDelegate: boolean
  isMemberCA: boolean
  tabs: Map<TabLocation, Tab>
}>;
