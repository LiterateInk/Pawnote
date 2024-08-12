import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Period } from "~/parser/period";
import type { Session } from "~/session";

export interface PronoteApiUserEvaluations {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Evaluations
    }

    donnees: {
      periode: {
        /** ID of the period. */
        N: string
        /** Name of the period. */
        L: string
        G: number
      }
    }
  }

  response: {
    nom: PronoteApiFunctions.Evaluations
    donnees: {
      listeEvaluations: {
        _T: number
        V: Array<{
          /** Name */
          L: string
          /** ID */
          N: string
          /** Random number ??? */
          G: number

          /** Skills graded in the evaluation. */
          listeNiveauxDAcquisitions: {
            _T: number
            V: Array<{
              /** Grade value. */
              L: string
              N: string
              G: number

              /** Same as `L`, grade value, but this one is a way smaller format. */
              abbreviation: string

              /** Position in the skill table of the evaluation. */
              ordre: number

              pilier: {
                _T: number
                V: {
                  /** Name of the skill. */
                  L: string
                  N: string
                  G: number
                  /** Small name of the skill. */
                  strPrefixes: string
                  /** Possible position ? */
                  ordre?: number
                }
              }

              /** Coefficient of this grading. */
              coefficient: number

              domaine: {
                _T: number
                V: {
                  L: string
                  N: string
                }
              }

              /** Skill's information. */
              item?: {
                _T: number
                V: {
                  /** Name of the skill. */
                  L: string
                  N: string
                }
              }
            }>
          }

          /** Levels. */
          listePaliers: {
            _T: number
            V: Array<{
              /** Name of the level. */
              L: string
              N: string
            }>
          }

          /** Subject. */
          matiere: {
            _T: number
            V: {
              /** Name of the subject. */
              L: string
              N: string
              G: number
              /** Color defined in Pronote for this subject. */
              couleur: string
              /** Position. */
              ordre: number
              /** No idea tbh. */
              serviceConcerne: {
                _T: number
                V: {
                  N: string
                  G: number
                }
              }
            }
          }

          /** No idea. */
          ListeThemes: {
            _T: number
            V: Array<unknown>
          }

          /** Teacher of the subject. */
          individu: {
            _T: number
            V: {
              /** Name of the teacher. */
              L: string
              N: string
            }
          }

          /** Coefficient of this evaluation. */
          coefficient: number
          /** Description of this evaluation. */
          descriptif: string

          date: {
            _T: number
            /** Format is the following : DD/MM/YYYY */
            V: string
          }

          periode: {
            _T: number
            /** Value of the period containing this evaluation. */
            V: {
              L: string
              N: string
            }
          }
        }>
      }
    }
  }
}

export interface ApiUserEvaluations {
  input: {
    session: Session
    period: Period
  }

  output: {
    data: PronoteApiUserEvaluations["response"]
  }
}
