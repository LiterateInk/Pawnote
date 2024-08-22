import { SessionHandle } from "~/models";
import forge from "node-forge";

type Keys = {
  iv: forge.util.ByteBuffer;
  key: forge.util.ByteBuffer;
};

export const aesKeys = (session: SessionHandle, forceEmptyIV = false): Keys => {
  const iv = forge.util.createBuffer(forceEmptyIV ? "" : session.information.aesIV);
  const key = forge.util.createBuffer(session.information.aesKey);

  return { iv, key };
};
