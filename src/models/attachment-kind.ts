export const AttachmentKind = {
  Link: 0,
  File: 1
} as const;

export type AttachmentKind = typeof AttachmentKind[keyof typeof AttachmentKind];
