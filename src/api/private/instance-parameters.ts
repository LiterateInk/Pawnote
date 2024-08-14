import { RequestFN } from "~/core/request-function";
import { SessionHandle } from "../../models/session-handle";
import forge from "node-forge";

export const instanceParameters = async (session: SessionHandle): Promise<any> => {
  const rsaKey = forge.pki.rsa.setPublicKey(
    new forge.jsbn.BigInteger(session.information.rsaModulus, 16),
    new forge.jsbn.BigInteger(session.information.rsaExponent, 16)
  );

  const aesIV = session.information.aesIV;
  let uuid: string;

  if (session.information.rsaFromConstants) {
    uuid = forge.util.encode64(session.information.http ? rsaKey.encrypt(aesIV) : aesIV, 64);
  }
  else {
    uuid = forge.util.encode64(rsaKey.encrypt(aesIV));
  }

  const request = new RequestFN(session, "FonctionParametres", {
    donnees: {
      identifiantNav: null,
      Uuid: uuid
    }
  });

  const response = await request.send();
  return response.data.donnees;
};
