import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiAccountId } from "~/constants/accounts";
import type { Session } from "~/session";
import type { PronoteApiDomainFrequencyType } from "~/constants/domain";
import type { PronoteValue } from "~/api/type";
import type { PronoteApiHTTPType } from "~/constants/http";
import type { PronoteApiID } from "~/constants/id";

export interface PronoteApiLoginInformations {
  request: {
    donnees: {
      identifiantNav: string | null
      Uuid: string
    }
  }

  response: {
    nom: PronoteApiFunctions.Informations

    _Signature_: {
      ModeExclusif: boolean
    }

    donnees: {
      /** Time on the server when the request was made. */
      DateServeurHttp: {
        _T: 7
        /** In the following format : `DD/MM/YYYY HH:mm:ss` */
        V: string
      }

      /** Content of the header in instance page. */
      Nom: string

      // Whatever this number is (???)
      Theme: number

      /** Path for the same instance page but on desktop. */
      URLEspace: string

      // I don't know what all the following properties are meant for.
      avecMembre: boolean
      genreImageConnexion: number
      identifiantNav: string
      labelLienProduit: string

      /** Array of available fonts... why the hell they need this ? */
      listePolices: {
        _T: 24
        V: Array<{ L: string }>
      }

      // This should be some CSS path ?
      logoProduitCss: string

      // I might have an idea of what it is but yeah- no...
      mentionsPagesPubliques: {
        lien: {
          _T: 21
          V: string
        }
      }

      // Is there something special for Nouvelle Calédonie instances ?
      pourNouvelleCaledonie: boolean
      // Still don't know what it is.
      urlImageConnexion: string

      General: {
        urlSiteIndexEducation: {
          _T: 23
          V: string
        }

        urlSiteInfosHebergement: {
          _T: 23
          V: string
        }

        /** Complete version with name of the app.  */
        version: string
        /** Pronote version. */
        versionPN: string

        /** Year of the version. */
        millesime: string

        /** Current language. */
        langue: string
        /** Current language ID. */
        langID: number

        /** List of available languages. */
        listeLangues: {
          _T: 24
          V: Array<{
            langID: number
            description: string
          }>
        }

        lienMentions: string
        estHebergeEnFrance: boolean
        avecForum: boolean

        UrlAide: {
          _T: 23
          V: string
        }

        urlAccesVideos: {
          _T: 23
          V: string
        }

        urlAccesTwitter: {
          _T: 23
          V: string
        }

        urlFAQEnregistrementDoubleAuth: {
          _T: 23
          V: string
        }

        urlCanope: {
          _T: 23
          V: string
        }

        AvecChoixConnexion: boolean

        NomEtablissement: string
        NomEtablissementConnexion: string

        afficherSemainesCalendaires: 0 | 1 // Boolean.
        AnneeScolaire: string

        dateDebutPremierCycle: {
          _T: 7
          V: string
        }

        PremierLundi: {
          _T: 7
          V: string
        }

        PremiereDate: {
          _T: 7
          V: string
        }

        DerniereDate: {
          _T: 7
          V: string
        }

        PlacesParJour: number
        PlacesParHeure: number
        DureeSequence: number
        PlaceDemiJourneeAbsence: number
        activationDemiPension: boolean
        debutDemiPension: number
        finDemiPension: number
        AvecHeuresPleinesApresMidi: boolean

        JourOuvre: {
          _T: 7
          V: string
        }

        JourOuvres: {
          _T: 11
          V: string
        }

        JoursDemiPension: {
          _T: 26
          V: string
        }

        ActivationMessagerieEntreParents: boolean
        GestionParcoursExcellence: boolean
        joursOuvresParCycle: number
        premierJourSemaine: number
        numeroPremiereSemaine: number
        grillesEDTEnCycle: number

        setOfJoursCycleOuvre: {
          _T: 26
          V: string
        }

        DemiJourneesOuvrees: Array<{
          _T: 26
          V: string
        }>

        /**
         * @example
         * // A value can look like this :
         * "[1..7,10..16,19..25,28..33,36..44]"
         * // Can be read in Pawnote using the internal `parseSelection()` function.
         */
        DomainesFrequences: Record<PronoteApiDomainFrequencyType, PronoteValue<PronoteApiHTTPType.Element, string>>
        LibellesFrequences: Record<PronoteApiDomainFrequencyType, string>

        BaremeNotation: {
          _T: 10
          V: string
        }

        listeAnnotationsAutorisees: {
          _T: 26
          V: string
        }

        ListeNiveauxDAcquisitions: {
          _T: 24
          V: Array<{
            L: string
            N: string
            G: number
            P: number

            listePositionnements: {
              _T: 24
              V: Array<{
                /** Position ID (from 1). */
                G: number
                /** Position name. */
                L: string
                abbreviation: string
              }>
            }

            positionJauge: number
            actifPour: {
              _T: 26
              V: string
            }
            abbreviation: string
            raccourci: string

            /** Color in HEX format. */
            couleur?: string
            ponderation?: {
              _T: 10
              V: string
            }

            nombrePointsBrevet?: {
              _T: 10
              V: string
            }

            estAcqui?: boolean
            estNotantPourTxReussite?: boolean
          }>
        }

        AfficherAbbreviationNiveauDAcquisition: boolean
        AvecEvaluationHistorique: boolean
        SansValidationNivIntermediairesDsValidAuto: boolean
        NeComptabiliserQueEvalsAnneeScoDsValidAuto: boolean
        AvecGestionNiveauxCECRL: boolean
        couleurActiviteLangagiere: string
        minBaremeQuestionQCM: number
        maxBaremeQuestionQCM: number
        maxNbPointQCM: number
        tailleLibelleElementGrilleCompetence: number
        tailleCommentaireDevoir: number
        AvecRecuperationInfosConnexion: boolean
        Police: string
        TaillePolice: number
        AvecElevesRattaches: boolean
        maskTelephone: string
        maxECTS: number
        TailleMaxAppreciation: number[]

        listeJoursFeries: {
          _T: 24
          V: Array<{
            /** Name of the day. */
            L: string
            N: string // ID (?)

            dateDebut: {
              _T: 7
              V: string
            }

            dateFin: {
              _T: 7
              V: string
            }
          }>
        }

        afficherSequences: boolean

        /** Pronote's Epoch (?) */
        PremiereHeure: {
          _T: 7
          V: string
        }

        ListeHeures: {
          _T: 24
          V: Array<{
            /** ID. */
            G: number

            /** Hour. */
            L: string

            A?: boolean
          }>
        }

        ListeHeuresFin: {
          _T: 24
          V: Array<{
            /** ID. */
            G: number

            /** Hour. */
            L: string

            A?: boolean
          }>
        }

        sequences: string[]

        ListePeriodes: Array<{
          /** Name of the period. */
          L: string
          /** ID of the period. */
          N: PronoteApiID<112> | "0"
          G: number

          periodeNotation: number
          dateDebut: {
            _T: 7
            V: string
          }

          dateFin: {
            _T: 7
            V: string
          }
        }>

        logo: {
          _T: 25
          V: number
        }

        recreations: {
          _T: 24
          V: unknown[] // Empty array ?
        }

        tailleMaxEnregistrementAudioRenduTAF: number
        genresRenduTAFValable: {
          _T: 26
          V: string
        }

        nomCookieAppli: string
      }
    }
  }
}

export interface ApiLoginInformations {
  input: {
    accountTypeID: PronoteApiAccountId
    pronoteURL: string

    /** Cookies to append in the request for instance page. */
    cookies?: Array<string>
  }

  output: {
    data: PronoteApiLoginInformations["response"]
    createdSession: Session

    /**
     * Generated username and password, only
     * if the first authentication was made with ENT.
     */
    setup?: {
      username: string
      password: string
    }
  }
}
