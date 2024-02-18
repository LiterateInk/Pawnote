import type { PronoteValue } from "~/api/type";

export enum PronoteApiAttendanceItemType {
  Absence = 13,
  Delay = 14,
  Punishment = 41
}

export interface PronoteApiAttendanceAbsence {
  N: string
  G: PronoteApiAttendanceItemType.Absence
  dateDebut: PronoteValue<7, string>
  dateFin: PronoteValue<7, string>
  ouverte: boolean
  reglee: boolean
  justifie: boolean
  estMotifNonEncoreConnu: boolean
  aJustifierParParents: boolean
  NbrHeures: string
  NbrJours: number
  listeMotifs: {
    _T: number
    V: Array<{
      L: string
      N: string
    }>
  }
  page: {
    Onglet: number
    Membre: string
    Absence: number
    message: string
  }
}

export interface PronoteApiAttendanceDelay {
  N: string
  G: PronoteApiAttendanceItemType.Delay
  date: PronoteValue<7, string>
  reglee: boolean
  justifie: boolean
  aJustifierParParents: boolean
  estMotifNonEncoreConnu: boolean
  justification: string
  /** Time missed in minutes. Can go from `1` to `240`. */
  duree: number
  listeMotifs: {
    _T: number
    V: Array<{
      L: string
      N: string
    }>
  }
  page: {
    Onglet: number
    Membre: string
    Absence: number
    message: string
  }
}

export interface PronoteApiAttendancePunishment {
  N: string
  G: PronoteApiAttendanceItemType.Punishment
  dateDemande: PronoteValue<7, string>
  /** Position in the timetable for the day related to `dateDemande` */
  placeDemande: number
  estUneExclusion: boolean
  horsCours: boolean
  travailAFaire: string
  documentsTAF: {
    _T: number
    V: Array<any>
  }
  estLieAUnIncident: boolean
  publierTafApresDebutRetenue: boolean
  documentsCirconstances: {
    _T: number
    V: Array<any>
  }
  nature: {
    _T: number
    V: {
      L: string
      N: string
      G: number
      estProgrammable: boolean
    }
  }
  matiere: {
    _T: number
    V: {
      N: string
    }
  }
  duree: number
  circonstances: string
  listeMotifs: {
    _T: number
    V: Array<{
      L: string
      N: string
    }>
  }
  demandeur: {
    _T: number
    V: {
      L: string
      N: string
      G: number
      fonction: {
        _T: number
        V: {
          N: string
        }
      }
    }
  }
  estProgrammable: boolean
  programmation: {
    _T: number
    V: Array<any>
  }
  page: {
    Onglet: number
    Membre: string
    Absence: number
    message: string
  }
}
