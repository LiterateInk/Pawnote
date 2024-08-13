export const SessionAccessKind = {
  ACCOUNT: 0,
  ACCOUNT_CONNECTION: 1,
  DIRECT_CONNECTION: 2,
  TOKEN_ACCOUNT_CONNECTION: 3,
  TOKEN_DIRECT_CONNECTION: 4,
  COOKIE_CONNECTION: 5
} as const;

export type SessionAccessKind = typeof SessionAccessKind[keyof typeof SessionAccessKind];
