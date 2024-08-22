export const DiscussionCommand = {
  lu: "lu",
  nonLu: "nonLu",
  archiver: "archiver",
  desarchiver: "desarchiver",
  transferer: "transferer",
  signaler: "signaler",
  modifierCategories: "modifierCategories",
  fermerDiscussion: "fermerDiscussion",
  ouvrirDiscussion: "ouvrirDiscussion",
  signalerSuppression: "signalerSuppression",
  Trash: "corbeille",
  Restore: "restauration",
  Delete: "suppression",
  brouillon: "brouillon",
  plus: "plus",
  purger: "purger",
  discussionEnFenetre: "discussionEnFenetre",
  entrerSortirDiscussion: "entrerSortirDiscussion",
  modificationObjetDiscussion: "modificationObjetDiscussion",
  afficherDestinataires: "afficherDestinataires",
  copierContenuVisu: "copierContenuVisu",
  repondreMessage: "repondreMessage",
  afficherDiscussion: "afficherDiscussion"
} as const;

export type DiscussionCommand = typeof DiscussionCommand[keyof typeof DiscussionCommand];
