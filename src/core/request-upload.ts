import type { SessionHandle } from "~/models";
import forge from "node-forge";
import { AES } from "../api/private/aes";

type SupportedFile =
  | Blob | File | Buffer | ArrayBuffer | Uint8Array
  | { // Only for React Native.
    uri: string
    name: string
    type: string
    size: number
  };

export class RequestUpload {
  public order: string;

  public fileID = `selecfile_1_${Date.now()}`;
  public md5 = "";

  public constructor (
    private session: SessionHandle,
    public file: SupportedFile
  ) {
    session.information.order++;

    const iv = forge.util.createBuffer(this.session.information.aesIV);
    const key = forge.util.createBuffer(this.session.information.aesKey);

    this.order = AES.encrypt(session.information.order.toString(), key, iv);
  }
}
