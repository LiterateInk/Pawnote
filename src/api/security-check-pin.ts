import { RequestFN } from "~/core/request-function";
import { DoubleAuthServerAction, SessionHandle } from "~/models";
import { aesKeys } from "./private/keys";
import { AES } from "~/api/private/aes";

export const securityCheckPIN = async (session: SessionHandle, pin: string) => {
  const keys = aesKeys(session);

  const request = new RequestFN(session, "SecurisationCompteDoubleAuth", {
    donnees: {
      action: DoubleAuthServerAction.csch_VerifierPIN,
      codePin: AES.encrypt(pin, keys.key, keys.iv)
    }
  });

  const response = await request.send();
};
