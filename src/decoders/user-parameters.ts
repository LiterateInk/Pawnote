import { AccountKind, type SessionHandle, type UserParameters } from "~/models";
import { decodeUserAuthorizations } from "./user-authorizations";
import { decodeUserResource } from "./user-resource";

export const decodeUserParameters = (parameters: any, session: SessionHandle): UserParameters => {
  let resources: Array<any>;

  switch (session.information.accountKind) {
    case AccountKind.STUDENT:
      resources = [parameters.ressource];
      break;
    case AccountKind.PARENT:
      resources = parameters.ressource.listeRessources;
      break;
    default:
      throw new Error("account kind not supported for now");
  }

  return {
    id: parameters.ressource.N,
    kind: parameters.ressource.G,
    name: parameters.ressource.L,
    resources: resources.map((resource) => decodeUserResource(resource, session)),
    authorizations: decodeUserAuthorizations(parameters.autorisations, parameters.listeOnglets)
  };
};
