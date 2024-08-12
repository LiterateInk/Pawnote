import type { PronoteValue } from "~/api/type";
import type { PronoteApiAttendanceAbsence, PronoteApiAttendanceDelay, PronoteApiAttendancePunishment, PronoteApiAttendanceObservation, PronoteApiAttendancePrecautionaryMeasure } from "~/constants/attendance";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Period } from "~/parser/period";
import type { Session } from "~/session";

export interface PronoteApiUserAttendance {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Attendance
    }
    donnees: {
      DateDebut: PronoteValue<7, string>
      DateFin: PronoteValue<7, string>

      periode: {
        N: string
        G: number
        L: string
      }
    }
  }

  response: {
    donnees: {
      nbMaxJoursDeclarationAbsence: number
      autorisations: {
        saisieMotifAbsence: boolean
        absence: boolean
        retard: boolean
        saisieMotifRetard: boolean
        punition: boolean
        exclusion: boolean
        sanction: boolean
        mesureConservatoire: boolean
        infirmerie: boolean
        absenceRepas: boolean
        absenceInternat: boolean
        observation: boolean
        incident: boolean
        totalHeuresManquees: boolean
      }
      listeAbsences: PronoteValue<24, Array<(
        | PronoteApiAttendanceDelay
        | PronoteApiAttendanceAbsence
        | PronoteApiAttendancePunishment
        | PronoteApiAttendanceObservation
        | PronoteApiAttendancePrecautionaryMeasure
      )>>

      Matieres: {
        _T: 24
        V: Array<{
          L: string
          N: string
          G?: number
          P: number
          regroupement: number
          dansRegroupement: number
          suivi: number
          absence: number
          excluCours: number
          excluEtab: number
          pere?: {
            _T: number
            V: {
              L: string
              N: string
            }
          }
        }>
      }

      listeRecapitulatifs: {
        _T: 24
        V: Array<{
          G: number
          NombreTotal: number
          NbrHeures: string
          NombreNonJustifie: number
        }>
      }

      listeSanctionUtilisateur: {
        _T: 24
        V: Array<unknown>
      }
    }
    nom: PronoteApiFunctions.Attendance
  }
}

export interface ApiUserAttendance {
  input: {
    session: Session,
    period: Period
  }

  output: {
    data: PronoteApiUserAttendance["response"]
  }
}
