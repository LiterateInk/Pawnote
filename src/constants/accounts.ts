export enum PronoteApiAccountId {
  Commun = 0,
  Eleve = 6,
  Parent = 7,
  Professeur = 8,
  Accompagnant = 26,
  Entreprise = 4,
  VieScolaire = 14,
  Direction = 17,
  Academie = 5
}

export interface PronoteApiAccountType {
  id: PronoteApiAccountId
  name: string
  path: string
}

export const PRONOTE_ACCOUNT_TYPES: PronoteApiAccountType[] = [
  {
    id: PronoteApiAccountId.Commun,
    name: "Commun",
    path: "" // No path since the "Commun" account is on root path.
  },
  {
    id: PronoteApiAccountId.Eleve,
    name: "Élève",
    path: "mobile.eleve.html"
  },
  {
    id: PronoteApiAccountId.Parent,
    name: "Parent",
    path: "mobile.parent.html"
  },
  {
    id: PronoteApiAccountId.Professeur,
    name: "Professeur",
    path: "mobile.professeur.html"
  },
  {
    id: PronoteApiAccountId.Accompagnant,
    name: "Accompagnant",
    path: "mobile.accompagnant.html"
  },
  {
    id: PronoteApiAccountId.Entreprise,
    name: "Entreprise",
    path: "mobile.entreprise.html"
  },
  {
    id: PronoteApiAccountId.VieScolaire,
    name: "Vie Scolaire",
    path: "mobile.viescolaire.html"
  },
  {
    id: PronoteApiAccountId.Direction,
    name: "Direction",
    path: "mobile.direction.html"
  },
  {
    id: PronoteApiAccountId.Academie,
    name: "Académie",
    path: "mobile.academie.html"
  }
];
