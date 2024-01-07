import type { PronoteApiAttachment } from "~/constants/attachments";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserHomework {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }

    donnees: {
      domaine: {
        _T: 8
        /** You put the week(s) you want to get between the brackets. */
        V: `[${number}..${number}]` | `[${number}]`
      }
    }
  }

  response: {
    nom: PronoteApiFunctions.Homework
    donnees: {
      ListeTravauxAFaire: {
        _T: 24
        V: Array<{
          /** ID of the homework. */
          N: string

          /** Content of the homework. */
          descriptif: {
            _T: number
            /** This is actually HTML, use innerHTML to render the content. */
            V: string
          }

          avecMiseEnForme: boolean

          /** Due date for the homework. */
          PourLe: {
            _T: 7
            /** Date format is "DD/MM/YYYY". */
            V: string
          }

          /** When the work has been done. */
          TAFFait: boolean

          niveauDifficulte: number
          duree: number

          cahierDeTextes: {
            _T: 24
            V: {
              N: string
            }
          }

          cours: {
            _T: 24
            V: {
              N: string
            }
          }

          /** When the homework has been given. */
          DonneLe: {
            _T: 7
            /** Date format is "DD/MM/YYYY". */
            V: string
          }

          Matiere: {
            _T: 24
            V: {
              /** Name of the subject. */
              L: string
              N: string
            }
          }

          /** HEX value of the background color given on Pronote. */
          CouleurFond: string

          nomPublic: string
          ListeThemes: {
            _T: 24
            V: unknown[]
          }

          libelleCBTheme: string

          /** Attachments. */
          ListePieceJointe: {
            _T: 24
            V: Array<PronoteApiAttachment>
          }
        }>
      }
    }
  }
}

export interface ApiUserHomework {
  input: {
    session: Session

    fromWeekNumber: number
    toWeekNumber?: number
  }

  output: {
    data: PronoteApiUserHomework["response"]
  }
}
