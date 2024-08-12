import type { PronoteValue } from "~/api/type";
import type { PronoteApiResourceType } from "~/constants/resources";
import type { PronoteApiUserResourceType } from "~/constants/users";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiAttachment } from "./attachments";
import type { PronoteApiHTTPType } from "./http";
import type { PronoteApiID } from "./id";

/**
 * Possible types for an observation in the attendance section.
 * @original `TypeGenreObservationVS`
 */
export enum PronoteApiAttendanceObservationType {
  /** @original `OVS_DefautCarnet` */
  LogBookIssue = 0,

  /** @original `OVS_ObservationParent` */
  Observation = 1,

  /** @original `OVS_Encouragement` */
  Encouragement = 2,

  /** @original `OVS_Autres` */
  Other = 3
}

export enum PronoteApiAttendancePrecautionaryMeasureDisallowedType {
  /** "à l'internat" */
  Internat = 0,
  /** "à l'établissement" */
  Etablissement = 1,
  /** "à la demi-pension" */
  DP = 2
}

/**
 * An observation is anything that is in the "Rubriques de la feuille d'appel"
 * on the PRONOTE client.
 *
 * So it could be an "Observation", "Oubli de matériel", "Travail non fait",
 * and anything else (you can even add custom ones !)
 */
export interface PronoteApiAttendanceObservation {
  /** @example "Leçon non apprise" */
  L: string
  N: string
  G: PronoteApiResourceType.ObservationProfesseurEleve

  rubrique: PronoteValue<24, {
    /** @example "Leçon non apprise" */
    L: string
    N: string
    G: PronoteApiAttendanceObservationType
  }>

  genreObservation: PronoteApiAttendanceObservationType
  date: PronoteValue<7, string>
  demandeur: PronoteValue<24, {
    L: string
    N: string
    G: PronoteApiUserResourceType
  }>

  matiere: PronoteValue<24, {
    N: "0"
  } | {
    L: string
    N: string
  }>

  /** Empty if not comment was given. */
  commentaire: string

  /** Whether the student read the observation or not. */
  estLue: boolean

  /** Whether the observation should be acknowledged by the parents or not. */
  avecARObservation: boolean

  page: {
    Onglet: PronoteApiOnglets.Attendance,
    membre: PronoteValue<24, {
      L: string
      N: string
      P: number
    }>
  }

  Absence: 45
  message: string
}

export interface PronoteApiAttendancePrecautionaryMeasure {
  N: PronoteApiID<139>
  G: PronoteApiResourceType.PrecautionaryMeasure

  estLieAUnIncident: boolean

  /** @example "13/05/2024 22:37:33" */
  dateDemande: PronoteValue<PronoteApiHTTPType.DateTime, string>

  nature: PronoteValue<PronoteApiHTTPType.Element, {
    /** @example "Mesure conservatoire" */
    L: string
    N: PronoteApiID<106>
    G: 10 // NOTE: Is this a constant ?
  }>

  estUneExclusion: boolean

  listeMotifs: {
    _T: number
    V: Array<{
      L: string
      N: string
    }>
  }
  commentaire: string
  circonstances: string
  documentsCirconstances: {
    _T: number
    V: Array<PronoteApiAttachment>
  }
  decideur: {
    _T: number
    V: {
      /** @example "" */
      L: string
      N: PronoteApiID<113>
      G: number
      fonction: PronoteValue<PronoteApiHTTPType.Element, {
        /** @example "Proviseur" */
        L: string
        N: PronoteApiID<62>
      }>
    }
  }
  dateDebut: {
    _T: number
    V: string
  }
  dateFin: {
    _T: number
    V: string
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
  duree: number
  interditAcces: {
    _T: number
    V: string
  }
}

export interface PronoteApiAttendanceAbsence {
  N: string
  G: PronoteApiResourceType.Absence
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
  G: PronoteApiResourceType.Delay
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
  G: PronoteApiResourceType.Punishment

  estLieAUnIncident: boolean

  /** @example "13/05/2024 22:37:33" */
  dateDemande: PronoteValue<PronoteApiHTTPType.DateTime, string>

  nature: {
    _T: number
    V: {
      L: string
      N: string
      G: number
      estProgrammable: boolean
    }
  }

  /** Position in the timetable for the day related to `dateDemande` */
  placeDemande: number

  estUneExclusion: boolean

  horsCours: boolean
  travailAFaire: string
  documentsTAF: {
    _T: number
    V: Array<any>
  }
  publierTafApresDebutRetenue: boolean
  documentsCirconstances: {
    _T: number
    V: Array<any>
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
