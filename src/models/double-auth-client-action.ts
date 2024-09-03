export const DoubleAuthClientAction = {
  AIHMSC_PersonnalisationMotDePasse: 0,
  AIHMSC_ChoixStrategie: 1,
  AIHMSC_ChoixCodePINetSource: 2,
  AIHMSC_SaisieCodePINetSource: 3,
  AIHMSC_ReinitCodePINetSource: 4,
  AIHMSC_SaisieSourcePourNotifSeulement: 5
} as const;

export type DoubleAuthClientAction = typeof DoubleAuthClientAction[keyof typeof DoubleAuthClientAction];
