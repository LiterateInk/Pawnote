export interface PronoteApiAttachment {
  G: PronoteApiAttachmentType;
  /** Name of the attachment, with extension if file. */
  L?: string;
  /** ID */
  N: string;

  /** Given when the attachment is not a file, but an external link. */
  url?: string
}

export enum PronoteApiAttachmentType {
  Link = 0,
  File = 1
}
