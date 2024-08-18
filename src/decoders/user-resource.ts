import type { Attachment, SessionHandle, Tab, UserResource } from "~/models";
import { decodeAttachment } from "./attachment";
import { decodeTab } from "./tab";

export const decodeUserResource = (resource: any, session: SessionHandle): UserResource => {
  let profilePicture: Attachment | null = null;

  if (resource.avecPhoto) {
    profilePicture = decodeAttachment({
      G: 1,
      N: resource.N,
      L: "photo.jpg"
    }, session);
  }

  const tabs: Map<number, Tab> = new Map();

  for (const tab of resource.listeOngletsPourPeriodes?.V ?? []) {
    tabs.set(tab.G, decodeTab(tab, session.instance.periods));
  }

  return {
    id: resource.N,
    kind: resource.G,
    name: resource.L,
    establishmentName: resource.Etablissement.V.L,
    className: resource.classeDEleve?.L,
    profilePicture,
    tabs,
    isDirector: resource.estDirecteur ?? false,
    isDelegate: resource.estDelegue ?? false,
    isMemberCA: resource.estMembreCA ?? false
  };
};
