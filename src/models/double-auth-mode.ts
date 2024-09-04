export const DoubleAuthMode = {
  MGDA_PasEncoreChoisi: 0,
  MGDA_Inactive: 1,
  MGDA_NotificationSeulement: 2,
  MGDA_SaisieCodePIN: 3
} as const;

export type DoubleAuthMode = typeof DoubleAuthMode[keyof typeof DoubleAuthMode];
