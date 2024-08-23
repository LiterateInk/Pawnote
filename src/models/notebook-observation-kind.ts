export const NotebookObservationKind = {
  /** @original `OVS_DefautCarnet` */
  LogBookIssue: 0,

  /** @original `OVS_ObservationParent` */
  Observation: 1,

  /** @original `OVS_Encouragement` */
  Encouragement: 2,

  /** @original `OVS_Autres` */
  Other: 3
} as const;

export type NotebookObservationKind = typeof NotebookObservationKind[keyof typeof NotebookObservationKind];
