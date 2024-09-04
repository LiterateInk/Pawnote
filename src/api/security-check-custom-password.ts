import { RequestFN } from "~/core/request-function";
import { DoubleAuthServerAction, SessionHandle } from "~/models";
import { aesKeys } from "./private/keys";
import { AES } from "~/api/private/aes";

export const securityCheckCustomPassword = async (session: SessionHandle, newPassword: string): Promise<boolean> => {
  const keys = aesKeys(session);

  const request = new RequestFN(session, "SecurisationCompteDoubleAuth", {
    donnees: {
      action: DoubleAuthServerAction.csch_VerifierMotDePassePersonnalise,
      nouveauMDP: AES.encrypt(newPassword, keys.key, keys.iv)
    }
  });

  const response = await request.send();
  return response.data.donnees.result;
};
