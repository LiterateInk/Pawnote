export const AccountKind = {
  STUDENT: 6,
  PARENT: 7,
  TEACHER: 8
} as const;

export type AccountKind = typeof AccountKind[keyof typeof AccountKind];
