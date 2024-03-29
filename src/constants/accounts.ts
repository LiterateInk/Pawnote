export enum PronoteApiAccountId {
  Common = 0,
  Student = 6,
  Parent = 7,
  Teacher = 8,
  Accompagnant = 26,
  Enterprise = 4,
  VieScolaire = 14,
  Direction = 17,
  Academy = 5
}

export interface PronoteApiAccountType {
  id: PronoteApiAccountId
  name: string
  path: string
}

export const PRONOTE_ACCOUNT_TYPES: PronoteApiAccountType[] = [
  {
    id: PronoteApiAccountId.Common,
    name: "Commun",
    path: "" // No path since the "Commun" account is on root path.
  },
  {
    id: PronoteApiAccountId.Student,
    name: "Élève",
    path: "mobile.eleve.html"
  },
  {
    id: PronoteApiAccountId.Parent,
    name: "Parent",
    path: "mobile.parent.html"
  },
  {
    id: PronoteApiAccountId.Teacher,
    name: "Professeur",
    path: "mobile.professeur.html"
  },
  {
    id: PronoteApiAccountId.Accompagnant,
    name: "Accompagnant",
    path: "mobile.accompagnant.html"
  },
  {
    id: PronoteApiAccountId.Enterprise,
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
    id: PronoteApiAccountId.Academy,
    name: "Académie",
    path: "mobile.academie.html"
  }
];
