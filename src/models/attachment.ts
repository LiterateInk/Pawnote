import type { AttachmentKind } from "./attachment-kind";

export type Attachment = Readonly<{
  kind: AttachmentKind
  name: string
  url: string
  id: string
}>;
