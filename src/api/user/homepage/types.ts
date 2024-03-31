import type { PronoteValue } from "~/api/type";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteSSO } from "~/constants/partner";

export interface PronoteApiUserHomepage {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Presence
    }

    donnees: {
      avecConseilDeClasse: boolean
      dateGrille: PronoteValue<7, string>
      numeroSemaine: number
      coursNonAssures: {
        numeroSemaine: number
      }
      personnelsAbsents: {
        numeroSemaine: number
      }
      incidents: {
        numeroSemaine: number
      }
      exclusions: {
        numeroSemaine: number
      }
      donneesVS: {
        numeroSemaine: number
      }
      registreAppel: {
        date: PronoteValue<7, string>
      }
      previsionnelAbsServiceAnnexe: {
        date: PronoteValue<7, string>
      }
      donneesProfs: {
        numeroSemaine: number
      }
      EDT: {
        numeroSemaine: number
      }
      menuDeLaCantine: {
        date: PronoteValue<7, string>
      }
      TAFARendre: {
        date: PronoteValue<7, string>
      }
      TAFEtActivites: {
        date: PronoteValue<7, string>
      }
      partenaireCDI: {
        CDI: {}
      }
      tableauDeBord: {
        date: PronoteValue<7, string>
      }
    }
  }

  response: {
    donnees: {
      notes: {
        avecDetailDevoir: boolean
        avecDetailService: boolean
        listeDevoirs: {
          _T: number
          V: Array<{
            N: string
            G: number
            note: {
              _T: number
              V: string
            }
            bareme: {
              _T: number
              V: string
            }
            baremeParDefaut: {
              _T: number
              V: string
            }
            date: {
              _T: number
              V: string
            }
            service: {
              _T: number
              V: {
                L: string
                N: string
                G: number
                couleur: string
              }
            }
            periode: {
              _T: number
              V: {
                L: string
                N: string
              }
            }
            ListeThemes: {
              _T: number
              V: Array<{
                L: string
                N: string
              }>
            }
          }>
        }
        page: {
          periode: {
            _T: number
            V: {
              L: string
              N: string
            }
          }
        }
      }
      competences: {
        listeEvaluations: {
          _T: number
          V: Array<any>
        }
      }
      vieScolaire: {
        L: string
        listeAbsences: {
          _T: number
          V: Array<any>
        }
      }
      menuDeLaCantine: {
        listeRepas: {
          _T: number
          V: Array<any>
        }
      }
      actualites: {
        listeModesAff: Array<{
          G: number
          listeActualites: {
            _T: number
            V: Array<any>
          }
        }>
      }
      elections: {
        listeElections: {
          _T: number
          V: Array<any>
        }
      }
      agenda: {
        listeEvenements: Array<any>
      }
      prochaineDate: {
        _T: number
        V: string
      }
      prochainJourCycle: number
      dateSelectionnee: {
        _T: number
        V: string
      }
      jourCycleSelectionne: number
      avecCoursAnnule: boolean
      placeCourante: number
      ParametreExportiCal: string
      avecExportICal: boolean
      prefsGrille: {
        genreRessource: number
      }
      ListeCours: Array<{
        N: string
        G: number
        P: number
        place: number
        duree: number
        DateDuCours: {
          _T: number
          V: string
        }
        CouleurFond: string
        ListeContenus: {
          _T: number
          V: Array<{
            L: string
            N?: string
            G: number
          }>
        }
        AvecTafPublie: boolean
        Statut?: string
        cahierDeTextes?: {
          _T: number
          V: {
            N: string
          }
        }
        AvecCdT?: boolean
      }>
      premierePlaceHebdoDuJour: number
      debutDemiPensionHebdo: number
      finDemiPensionHebdo: number
      absences: {
        listeAbsences: {
          _T: number
          V: Array<any>
        }
        listeRetards: {
          _T: number
          V: Array<any>
        }
        listePunitions: {
          _T: number
          V: Array<any>
        }
        listeInfirmeries: {
          _T: number
          V: Array<any>
        }
      }
      recreations: {
        _T: number
        V: Array<{
          L: string
          place: number
        }>
      }
      travailAFaire: {
        listeTAF: {
          _T: number
          V: Array<{
            N: string
            G: number
            matiere: {
              _T: number
              V: {
                L: string
                N: string
              }
            }
            descriptif: {
              _T: number
              V: string
            }
            ordre: number
            pourLe: {
              _T: number
              V: string
            }
            donneLe: {
              _T: number
              V: string
            }
            couleurFond: string
            couleurTexte: string
            niveauDifficulte: number
            duree: number
            listeDocumentJoint: {
              _T: number
              V: Array<{
                L: string
                N: string
                G: number
              }>
            }
            TAFFait: boolean
          }>
        }
      }
      discussions: {
        listeEtiquettes: {
          _T: number
          V: Array<{
            L: string
            N: string
            G: number
          }>
        }
        listeMessagerie: {
          _T: number
          V: Array<any>
        }
      }
      ressourcePedagogique: {
        listeRessources: {
          _T: number
          V: Array<{
            G: number
            ressource: {
              _T: number
              V: {
                L: string
                N: string
                G: number
              }
            }
            ListeThemes: {
              _T: number
              V: Array<any>
            }
            date: {
              _T: number
              V: string
            }
            matiere: {
              _T: number
              V: {
                N: string
              }
            }
          }>
        }
        listeMatieres: {
          _T: number
          V: Array<{
            L: string
            N: string
            G: number
            couleur: string
          }>
        }
      }
      QCM: {
        listeExecutionsQCM: Array<any>
        listeDevoirs: Array<any>
      }
      devoirSurveille: {
        listeDS: {
          _T: number
          V: Array<any>
        }
      }
      enseignementADistance: {
        jours: {
          _T: number
          V: Array<{
            G: number
            setOfDJCours: {
              _T: number
              V: string
            }
            date: {
              _T: number
              V: string
            }
            enEtablissement: boolean
            aDistance: boolean
            jourEntier: boolean
            setOfDJTravaille: {
              _T: number
              V: string
            }
            listeVisios: {
              _T: number
              V: Array<any>
            }
          }>
        }
        actif: boolean
      }
      kiosque: {
        listeRessources: {
          _T: number
          V: Array<any>
        }
      }
      lienUtile: {
        listeLiens: {
          _T: number
          V: Array<any>
        }
      }
      partenaireCDI: {}

      partenaireARD?: {
        porteMonnaie: {
          _T: number
          V: Array<{
            libellePorteMonnaie: string
            valeurSolde: string
            avecWarning: boolean
            hintSolde: string
            hintPorteMonnaie: string
          }>
        }
        SSO: PronoteSSO
        avecActualisation: boolean
      }
    }

    nom: PronoteApiFunctions.HomePage
  }
}


export interface ApiUserHomepage {
  input: {
    session: Session
    nextDateOpened: Date
    weekNumber: number
  }

  output: {
    data: PronoteApiUserHomepage["response"]
  }
}
