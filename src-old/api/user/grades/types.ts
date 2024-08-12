import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserGrades {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Grades
    }

    donnees: {
      Periode: {
        /** ID of the period. */
        N: string
        /** Name of the period. */
        L: string
      }
    }
  }

  response: {
    nom: PronoteApiFunctions.Grades
    donnees: {
      moyGenerale?: {
        _T: 10
        V: string
      }
      moyGeneraleClasse?: {
        _T: 10
        V: string
      }

      baremeMoyGenerale: {
        _T: 10
        V: string
      }

      baremeMoyGeneraleParDefaut: {
        _T: 10
        V: string
      }

      avecDetailDevoir: boolean
      avecDetailService: boolean

      listeServices: {
        _T: 24
        V: Array<{
          /** Name of the service/subject. */
          L: string
          N: string
          G: number
          ordre: number

          estServiceEnGroupe: boolean

          moyEleve?: {
            _T: 10
            V: string
          }

          baremeMoyEleve?: {
            _T: 10
            V: string
          }

          baremeMoyEleveParDefaut?: {
            _T: 10
            V: string
          }

          moyClasse: {
            _T: 10
            V: string
          }

          moyMin: {
            _T: 10
            V: string
          }

          moyMax: {
            _T: 10
            V: string
          }

          /** HEX color given in Pronote. */
          couleur: string
        }>
      }

      listeDevoirs: {
        _T: 24
        V: Array<{
          N: string
          G: number

          note: {
            _T: number
            /** Grade the user had. */
            V: string
          }

          bareme: {
            _T: 10
            /** The maximum grade value. */
            V: string
          }

          baremeParDefaut: {
            _T: 10
            V: string
          }

          date: {
            _T: 7
            /** Date in "DD/MM/YYYY" format. */
            V: string
          }

          service: {
            _T: 24
            V: {
              L: string
              N: string
              G: 12
              couleur: string
            }
          }

          periode: {
            _T: 24
            V: {
              L: string
              N: string
            }
          }

          ListeThemes: {
            _T: 24
            V: unknown[]
          }

          moyenne?: {
            _T: 10
            /** Overall grade on this exam. */
            V: string
          }

          estEnGroupe: boolean

          noteMax: {
            _T: 10
            /** Best grade someone had. */
            V: string
          }

          noteMin: {
            _T: 10
            /** Worst grade someone had. */
            V: string
          }

          /** Description of the exam. */
          commentaire: string

          coefficient: number
          estFacultatif: boolean
          estBonus: boolean
          estRamenerSur20: boolean

          /** Name of the correction file. */
          libelleCorrige?: string
          /** Name of the subject file. */
          libelleSujet?: string

          /** Available when the grade was based on a quiz. */
          executionQCM?: {
            _T: 24
            V: {
              N: string
              G: number
              QCM: {
                _T: 24
                V: {
                  /** Name of the quiz. */
                  L: string
                  N: string
                  G: number
                  /** Number of questions. */
                  nbQuestionsTotal: number
                  /** Maximum amout of points. */
                  nombreDePointsTotal: number
                  avecQuestionsSoumises: boolean
                  nombreQuestObligatoires: number
                  nbCompetencesTotal: number
                }
              }

              ListeThemes: {
                _T: 24
                V: unknown[]
              }

              fichierDispo: boolean
              estEnPublication: boolean

              dateDebutPublication: {
                _T: 7
                /** Date in format "DD/MM/YYYY HH:mm:ss". */
                V: string
              }

              dateFinPublication: {
                _T: 7
                /** Date in format "DD/MM/YYYY HH:mm:ss". */
                V: string
              }

              consigne: {
                _T: 21
                V: string
              }

              estLieADevoir: boolean
              estLieAEvaluation: boolean
              estUnTAF: boolean
              estSupprimable: boolean
              estDemarre: boolean
              etatCloture: number
              nbQuestRepondues: number
              nbQuestBonnes: number

              noteQCM: {
                _T: 10
                V: string
              }

              autoriserLaNavigation: boolean
              homogeneiserNbQuestParNiveau: boolean
              melangerLesQuestionsGlobalement: boolean
              melangerLesQuestionsParNiveau: boolean
              melangerLesReponses: boolean
              ressentiRepondant: boolean
              publierCorrige: boolean
              tolererFausses: boolean
              acceptIncomplet: boolean
              pointsSelonPourcentage: boolean
              afficherResultatNote: boolean
              afficherResultatNiveauMaitrise: boolean

              modeDiffusionCorrige: number
              nombreQuestionsSoumises: number
              dureeMaxQCM: number
              nombreDePoints: number

              listeProfesseurs: {
                _T: 24
                V: Array<{
                  L: string
                  N: string
                }>
              }

              ramenerSur20: boolean
              service: {
                _T: 24
                V: {
                  L: string
                  N: string
                }
              }

              coefficientDevoir: {
                _T: 10
                V: string
              }

              nomPublic: string
            }
          }
        }>
      }
    }
  }
}

export interface ApiUserGrades {
  input: {
    session: Session

    periodID: string
    periodName: string
  }

  output: {
    data: PronoteApiUserGrades["response"]
  }
}
