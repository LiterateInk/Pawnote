import { RequestFN } from "~/core/request-function";
import { DoubleAuthServerAction, SessionHandle } from "~/models";

/**
 * @returns true if the source is already known
 */
export const securitySource = async (session: SessionHandle, source: string): Promise<boolean> => {
  const request = new RequestFN(session, "SecurisationCompteDoubleAuth", {
    donnees: {
      action: DoubleAuthServerAction.csch_LibellesSourceConnexionDejaConnus,
      libelle: source
    }
  });

  const response = await request.send();
  return response.data.donnees.dejaConnu;
};
