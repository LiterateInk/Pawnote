export interface PronoteSSOARD {
  codePartenaire: "ARD"
  intituleLien: string
  description: string
}

export interface PronoteSSOTurboself {
  codePartenaire: "TURBOSELF"
}

export type PronoteSSO = PronoteSSOARD | PronoteSSOTurboself;
