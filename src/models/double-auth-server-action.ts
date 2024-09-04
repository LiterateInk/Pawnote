export const DoubleAuthServerAction = {
  csch_VerifierPIN: 0,
  csch_VerifierMotDePassePersonnalise: 1, // set a new password when asked at login

  csch_LibellesSourceConnexionDejaConnus: 2,
  csch_EnregistrerChoixUtilisateur: 3,
  csch_AffecterModeDoubleAuthentification: 4,
  csch_AffecterCodePIN: 5,
  csch_RenommerSourceConnexionConnue: 6,
  csch_SupprimerSourceConnexionConnue: 7,
  csch_AffecterMotDePassePersonnalise: 8,
  csch_ModifierLogin: 9,
  csch_DemandeReinitialisationPIN: 10,
  csch_VerifierCodeReinitialisationPIN: 11
} as const;

export type DoubleAuthServerAction = typeof DoubleAuthServerAction[keyof typeof DoubleAuthServerAction];
