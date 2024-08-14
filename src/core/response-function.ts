import type { SessionHandle } from "~/models";
import forge from "node-forge";
import { AES } from "../api/private/aes";
import pako from "pako";

export class ResponseFN {
  public constructor (
    private session: SessionHandle,
    public data: any
  ) {
    this.session.information.order++;
    const content = data;

    try {
      this.data = JSON.parse(this.data).donneesSec;

      if (!this.session.information.skipEncryption) {
        this.decrypt();
      }

      if (!this.session.information.skipCompression) {
        this.decompress();
      }

      if (typeof this.data === "string") {
        this.data = JSON.parse(this.data);
      }
    }
    catch (error) {
      if (content.includes("La page a expir")) {
        throw new Error("The page has expired.");
      }

      else if (content.includes("Votre adresse IP ")) {
        throw new Error("Your IP address is temporarily suspended.");
      }

      else if (content.includes("La page dem")) {
        throw new Error("The requested page does not exist.");
      }

      else if (content.includes("Impossible d'a")) {
        throw new Error("Page unaccessible.");
      }

      else if (content.includes("Vous avez d")) {
        throw new Error("You've been rate-limited.");
      }

      throw error;
    }
  }

  private decrypt (): void {
    const iv = forge.util.createBuffer(this.session.information.aesIV);
    const key = forge.util.createBuffer(this.session.information.aesKey);

    this.data = AES.decrypt(this.data, key, iv);

    if (!this.session.information.skipCompression) {
      this.data = forge.util.bytesToHex(this.data);
    }
  }

  private decompress (): void {
    const bytes = forge.util.hexToBytes(this.data);
    const compressed = new Uint8Array(Array.from(bytes).map((char) => char.charCodeAt(0)));
    this.data = pako.inflateRaw(compressed, { to: "string" });
  }
}
