export enum PronoteApiLessonContentCategory {
  NONE = 0,
  /** Corresponds to "Cours" */
  LESSON = 1,
  /** Corresponds to "Correction" */
  CORRECTION = 2,
  /** Corresponds to "Devoir sur table" */
  DST = 3,
  /** Corresponds to "Interrogation orale" */
  ORAL_INTERROGATION = 4,
  /** Corresponds to "Travaux dirigés" */
  TD = 5,
  /** Corresponds to "Travaux pratiques" */
  TP = 6,
  /** Corresponds to "Évaluation de compétences" */
  EVALUATION_COMPETENCES = 7,
  /** Corresponds to "EPI" */
  EPI = 8,
  /** Corresponds to "AP" */
  AP = 9,
  /** Corresponds to "Visio" */
  VISIO = 12
}

export enum PronoteApiLessonStatusType {
  EnseignementNormal = 0,
  ConseilDeClasse = 1,
  EnseignementRemplacement = 2,
  EnseignementHistorique = 3,
  EnseignementSuppleant = 4
}
