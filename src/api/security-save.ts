import { RequestFN } from "~/core/request-function";
import { DoubleAuthMode, DoubleAuthServerAction, type SessionHandle } from "~/models";
import { aesKeys } from "./private/keys";
import { AES } from "./private/aes";

export const securitySave = async (session: SessionHandle, options: {
  password?: string,
  deviceName?: string,
  pin?: string,
  mode: DoubleAuthMode
}): Promise<void> => {
  const data: any = {
    mode: options.mode,
    action: DoubleAuthServerAction.csch_EnregistrerChoixUtilisateur
  };

  const keys = aesKeys(session);

  if (options.password) {
    data.nouveauMDP = AES.encrypt(options.password, keys.key, keys.iv);
  }

  if (options.pin) {
    data.codePin = AES.encrypt(options.pin, keys.key, keys.iv);
  }

  if (options.deviceName) {
    data.avecIdentification = true;
    data.strIdentification = options.deviceName;
  }

  const request = new RequestFN(session, "SecurisationCompteDoubleAuth", {
    donnees: data
  });

  await request.send();
};
