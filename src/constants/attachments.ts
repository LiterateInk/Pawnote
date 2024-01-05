export interface PronoteApiAttachment {
  G: PronoteApiAttachmentType;
  L?: string;
  N: string;

  url?: string
}

export enum PronoteApiAttachmentType {
  Link = 0,
  File = 1
}
