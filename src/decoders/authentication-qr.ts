import type { AuthenticationQR } from "~/models";
import { decodeAccountKindFromPath } from "./account-kind";

export const decodeAuthenticationQr = (qr: any): AuthenticationQR => {
  const url = qr.url as string;

  const kindIndex: number = url.lastIndexOf("/") + 1;
  const base = url.substring(0, kindIndex - 1);
  const kindPath = url.substring(kindIndex);

  return {
    kind: decodeAccountKindFromPath(kindPath),
    url: base,
    token: qr.jeton,
    username: qr.login
  };
};
