import type { PronoteValue } from "~/api/type";
import type { PronoteApiAttachment } from "~/constants/attachments";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiHomeworkDifficulty } from "~/constants/homework";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiThemesList } from "~/constants/themes";
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
      ListeTravauxAFaire: PronoteValue<24, Array<{
        /** ID of the homework. */
        N: string

        /**
         * Content of the homework.
         * This is an HTML string, you can use whatever you want to parse/display it.
         */
        descriptif: PronoteValue<21, string>

        // TODO: Find what is this.
        avecMiseEnForme: boolean

        /**
         * When the homework has been given.
         * @example "22/01/2024"
         */
        DonneLe: PronoteValue<7, string>

        /**
         * Due date for the homework.
         * @example "24/01/2024"
         */
        PourLe: PronoteValue<7, string>

        /** `true` when the homework has been done. */
        TAFFait: boolean

        /** Difficulty of the given work. */
        niveauDifficulte: PronoteApiHomeworkDifficulty
        /**
         * Time in minutes to do the exercice.
         * @example 30 // For 30 minutes.
         */
        duree: number

        cahierDeTextes?: PronoteValue<24, {
          /** ID in `ListeCahierDeTextes` from `PronoteApiUserResources` response. */
          N: string
        }>

        cours: PronoteValue<24, {
          /** ID of the lesson in the timetable. */
          N: string
        }>

        /** Subject from where this homework is from. */
        Matiere: PronoteValue<24, {
          /** Name of the subject. */
          L: string
          /** ID of the subject. */
          N: string
        }>

        /** Subject color given by Pronote. */
        CouleurFond: string

        // TODO: Find what this is.
        nomPublic: string

        /** Themes associated with the homework. */
        ListeThemes: PronoteApiThemesList

        /** @example "Uniquement les thèmes associés aux matières du travail à faire" */
        libelleCBTheme: string

        /** Attachments. */
        ListePieceJointe: PronoteValue<24, Array<PronoteApiAttachment>>
      }>>
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
