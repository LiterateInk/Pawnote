import type { Attachment, SessionHandle, Tab, UserParameters } from "~/models";
import { decodeAttachment } from "./attachment";
import { decodeUserAuthorizations } from "./user-authorizations";
import { decodeTab } from "./tab";

export const decodeUserParameters = (parameters: any, session: SessionHandle): UserParameters => {
  let profilePicture: Attachment | null = null;
  if (parameters.ressource.avecPhoto) {
    profilePicture = decodeAttachment({
      G: 1,
      N: parameters.ressource.N,
      L: "photo.jpg"
    }, session);
  }

  const tabs: Map<number, Tab> = new Map();
  for (const tab of parameters.ressource.listeOngletsPourPeriodes.V) {
    tabs.set(tab.G, decodeTab(tab, session.instance.periods));
  }

  return {
    id: parameters.ressource.N,
    kind: parameters.ressource.G,
    name: parameters.ressource.L,
    className: parameters.ressource.Etablissement.V.L,
    establishmentName: parameters.ressource.classeDEleve.L,
    profilePicture,
    tabs,
    isDelegate: parameters.ressource.estDelegue ?? false,
    isMemberCA: parameters.ressource.estMembreCA ?? false,
    authorizations: decodeUserAuthorizations(parameters.autorisations, parameters.listeOnglets)
  };
};
