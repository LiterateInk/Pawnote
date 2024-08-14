import { RequestFN } from "~/core/request-function";
import type { SessionHandle } from "~/models";

export const userParameters = async (session: SessionHandle): Promise<any> => {
  const request = new RequestFN(session, "ParametresUtilisateur", {});
  const response = await request.send();
  return response.data.donnees;
};
