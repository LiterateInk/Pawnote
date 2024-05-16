import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiHTTPType } from "~/constants/http";
import type { PronoteApiID } from "~/constants/id";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Period } from "~/parser/period";
import type { Session } from "~/session";

export interface PronoteApiUserGeneratePDF {
  request: {
    donnees: {
      avecCodeCompetences: boolean
      genreGenerationPDF: 2
      options: {
        adapterHauteurService: boolean
        desEleves: boolean
        gererRectoVerso: boolean
        hauteurServiceMax: number
        hauteurServiceMin: number
        piedMonobloc: boolean
        portrait: boolean
        taillePolice: number
        taillePoliceMin: number
        taillePolicePied: number
        taillePolicePiedMin: number
      }
      periode: {
        G: number
        L: string
        N: PronoteApiID<112>
      }
    }

    _Signature_: {
      onglet: PronoteApiOnglets.GradesReport
    }
  }

  response: {
    donnees: {
      /** Path relative to root URL. */
      url: PronoteValue<PronoteApiHTTPType.ChaineBrute, string>
    }

    nom: PronoteApiFunctions.GeneratePDF
  }
}

export interface ApiUserGeneratePDF {
  input: {
    session: Session
    period: Period
  }

  output: {
    /** Path relative to root URL. */
    url: string
  }
}
