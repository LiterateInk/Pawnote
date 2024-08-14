import type { SessionHandle } from "~/models";
import forge from "node-forge";
import pako from "pako";
import { AES } from "../api/private/aes";
import { ResponseFN } from "./response-function";

/**
 * Abstraction to make requests to function API
 * of PRONOTE.
 */
export class RequestFN {
  private readonly order: string;
  public readonly url: URL;

  public constructor (
    private session: SessionHandle,

    /**
     * Function name.
     *
     * This is used by the server to
     * determine the function to call.
     */
    public name: string,

    /**
     * Data given to the "secure" property.
     */
    public data: any
  ) {
    session.information.order++;
    this.order = this.generateOrder();
    this.url = new URL(`${session.information.url}/appelfonction/${session.information.accountKind}/${session.information.id}/${this.order}`);

    if (!session.information.skipCompression) {
      this.compress();
    }

    if (!session.information.skipEncryption) {
      this.encrypt();
    }
  }

  private keys () {
    const iv = forge.util.createBuffer(this.session.information.order === 1 ? "" : this.session.information.aesIV);
    const key = forge.util.createBuffer(this.session.information.aesKey);
    return { iv, key };
  }

  private generateOrder (): string {
    const { key, iv } = this.keys();
    return AES.encrypt(this.session.information.order.toString(), key, iv);
  }

  private stringify (): string {
    return forge.util.encodeUtf8(JSON.stringify(this.data) || "");
  }

  private compress (): void {
    const buffer = forge.util.createBuffer(this.stringify()).toHex();

    // We compress it using zlib, level 6, without headers.
    const deflated = pako.deflateRaw(buffer, { level: 6 });
    const bytes = Array.from(deflated).map((byte) => String.fromCharCode(byte)).join("");

    // We output it to HEX.
    this.data = forge.util.bytesToHex(bytes);
  }

  private encrypt (): void {
    const { key, iv } = this.keys();

    const data = !this.session.information.skipCompression
      // If the data has been compressed, we get the bytes from HEX.
      ? forge.util.hexToBytes(this.data)
      : this.stringify();

    this.data = AES.encrypt(data, key, iv);
  }

  public async send (): Promise<ResponseFN> {
    const response = await this.session.fetcher({
      url: this.url,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      content: JSON.stringify({
        session: this.session.information.id,
        numeroOrdre: this.order,
        nom: this.name,
        donneesSec: this.data
      })
    });

    return new ResponseFN(this.session, response.content);
  }
}
