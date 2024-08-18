import type { Attachment, SessionHandle, UserParameters } from "~/models";
import { decodeAttachment } from "./attachment";
import { decodeUserAuthorizations } from "./user-authorizations";

export const decodeUserParameters = (parameters: any, session: SessionHandle): UserParameters => {
  let profilePicture: Attachment | null = null;
  if (parameters.ressource.avecPhoto) {
    profilePicture = decodeAttachment({
      G: 1,
      N: parameters.ressource.N,
      L: "photo.jpg"
    }, session);
  }

  return {
    id: parameters.ressource.N,
    kind: parameters.ressource.G,
    name: parameters.ressource.L,
    className: parameters.ressource.Etablissement.V.L,
    establishmentName: parameters.ressource.classeDEleve.L,
    profilePicture,
    isDelegate: parameters.ressource.estDelegue ?? false,
    isMemberCA: parameters.ressource.estMembreCA ?? false,
    authorizations: decodeUserAuthorizations(parameters.autorisations)

  };
};
