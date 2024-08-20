export const DocumentKind = {
  URL: 0,
  FILE: 1,
  CLOUD: 2,
  KIOSK_LINK: 3,
  CONFERENCE_LINK: 4
} as const;

export type DocumentKind = typeof DocumentKind[keyof typeof DocumentKind];
