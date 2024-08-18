import type { SessionHandle } from "~/models";
import forge from "node-forge";
import { AES } from "../api/private/aes";
import { aesKeys } from "../api/private/keys";

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

  public constructor (session: SessionHandle, public file: SupportedFile) {
    session.information.order++;

    const { iv, key } = aesKeys(session);

    this.order = AES.encrypt(session.information.order.toString(), key, iv);
  }
}
