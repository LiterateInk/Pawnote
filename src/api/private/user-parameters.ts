import { RequestFN } from "~/core/request-function";
import type { SessionHandle } from "~/models";
import { UserParameters } from "~/models/user-parameters";

export const userParameters = async (session: SessionHandle): Promise<UserParameters> => {
  const request = new RequestFN(session, "ParametresUtilisateur", {});
  const response = await request.send();
  return response.data.donnees;
};
