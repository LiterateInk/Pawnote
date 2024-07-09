import type { PronoteApiFunctionPayload } from "~/pronote/requestAPI";
import type { PronoteApiSession } from "~/pronote/session";
import type { PawnoteSupportedFormDataFile } from "~/utils/file";

import forge from "node-forge";
import pako from "pako";

import { PronoteApiAccountId } from "~/constants/accounts";
import aes from "~/utils/aes";

export enum SessionEncryptionRSAMethod {
  FROM_SESSION_DATA = "FROM_SESSION_DATA",
  CONSTANTS = "CONSTANTS"
}

export interface SessionInstance {
  pronote_url: string

  session_id: number
  account_type_id: PronoteApiAccountId

  skip_encryption: boolean
  skip_compression: boolean

  poll: boolean
  http: boolean

  demo: boolean

  order: number
  version: number[]
}

export interface SessionEncryption {
  aes: {
    iv: string
    key: string
  }

  rsa: {
    method: SessionEncryptionRSAMethod
    modulus: string,
    exponent: string
  }
}

const RSA_MODULO_1024 = "B99B77A3D72D3A29B4271FC7B7300E2F791EB8948174BE7B8024667E915446D4EEA0C2424B8D1EBF7E2DDFF94691C6E994E839225C627D140A8F1146D1B0B5F18A09BBD3D8F421CA1E3E4796B301EEBCCF80D81A32A1580121B8294433C38377083C5517D5921E8A078CDC019B15775292EFDA2C30251B1CCABE812386C893E5";
const RSA_EXPONENT_1024 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001";

export class Session {
  constructor (
    public instance: SessionInstance,
    public encryption: SessionEncryption
  ) {}

  /** Takes a raw session extracted from the Pronote page and then parses it. */
  public static importFromPage (pronoteURL: string, session_data: PronoteApiSession): Session {
    let aes_iv = "";

    // `a` parameter is not available in `Commun`.
    if (typeof session_data.a !== "number") {
      session_data.a = PronoteApiAccountId.Common;
    }

    // We have to setup IV for our session when we're not in `Commun`.
    if (session_data.a !== PronoteApiAccountId.Common) {
      aes_iv = forge.random.getBytesSync(16);
    }

    // Fallback to the latest version method.
    let methodRSA: SessionEncryptionRSAMethod = SessionEncryptionRSAMethod.CONSTANTS;

    // Before the 2023 update, we would have those two parameters for RSA.
    if (typeof session_data.ER === "string" && typeof session_data.MR === "string") {
      methodRSA = SessionEncryptionRSAMethod.FROM_SESSION_DATA;
    }

    return new Session({
      session_id: parseInt(session_data.h),
      account_type_id: session_data.a,

      pronote_url: pronoteURL,

      skip_compression: session_data.sCoA ?? false,
      skip_encryption: session_data.sCrA ?? false,

      poll: session_data.poll ?? false,
      http: session_data.http ?? false,
      demo: session_data.d ?? false,

      order: 0,
      // Empty since will be filled once the first request is done.
      version: []
    }, {
      aes: {
        iv: aes_iv,
        key: ""
      },

      rsa: {
        method: methodRSA,
        exponent: session_data.ER ?? RSA_EXPONENT_1024,
        modulus: session_data.MR ?? RSA_MODULO_1024
      }
    });
  }

  /**
   * Check the `this.encryption.aes` object and
   * returns the buffers of `iv` and `key` for the AES encryption.
   */
  public getAESEncryptionKeys () {
    /**
     * Even if the IV was setup, the first request made
     * should take an empty IV as parameter.
     *
     * Just so the server can read our encrypted request
     * and then setup our IV on their side.
     */
    const aes_iv = forge.util.createBuffer(this.instance.order === 1 ? "" : this.encryption.aes.iv);
    const aes_key = forge.util.createBuffer(this.encryption.aes.key);

    return { aes_iv, aes_key } as const;
  }

  public writePronoteFunctionPayload <Req>(data: Req): { order: string, data: Req | string } {
    this.instance.order++;

    let final_data: Req | string = data;
    const { aes_iv, aes_key } = this.getAESEncryptionKeys();

    const order_encrypted = aes.encrypt(this.instance.order.toString(), aes_key, aes_iv);

    if (!this.instance.skip_compression) {
      // We get the JSON as string.
      final_data = forge.util.encodeUtf8("" + JSON.stringify(final_data) || "");
      final_data = forge.util.createBuffer(final_data).toHex();

      // We compress it using zlib, level 6, without headers.
      const deflated_data = pako.deflateRaw(final_data, { level: 6 });
      final_data = String.fromCharCode.apply(null, Array.from(deflated_data));

      // We output it to HEX.
      // When encrypted, we should get the bytes from this hex.
      // When not encrypted, we send this HEX.
      final_data = forge.util.bytesToHex(final_data as string).toUpperCase();
    }

    if (!this.instance.skip_encryption) {
      const data = !this.instance.skip_compression
        // If the data has been compressed, we get the bytes
        // Of the compressed data (from HEX).
        ? forge.util.hexToBytes(final_data as string)
        // Otherwise, we get the JSON as string.
        : forge.util.encodeUtf8("" + JSON.stringify(final_data));

      const encrypted_data = aes.encrypt(data, aes_key, aes_iv);

      // Replace the request body with the encrypted one.
      final_data = encrypted_data.toUpperCase();
    }

    return {
      order: order_encrypted.toUpperCase(),
      data: final_data
    };
  }

  public readPronoteFunctionPayload <Res>(response_body: string): Res {
    const response = JSON.parse(response_body) as PronoteApiFunctionPayload<Res>;
    this.instance.order++;

    try {
      // Check the local order number with the received one.
      const { aes_iv, aes_key } = this.getAESEncryptionKeys();
      const decrypted_order = aes.decrypt(response.numeroOrdre, aes_key, aes_iv);

      if (this.instance.order !== parseInt(decrypted_order)) {
        throw new Error("The order number does not match.");
      }

      let final_data = response.donneesSec;

      if (!this.instance.skip_encryption) {
        const decrypted_data = aes.decrypt(final_data as string, aes_key, aes_iv);

        final_data = this.instance.skip_compression
          ? JSON.parse(decrypted_data)
          : forge.util.bytesToHex(decrypted_data);
      }

      if (!this.instance.skip_compression) {
        const compressed = new Uint8Array((final_data as string).match(/../g)!.map((h) => parseInt(h, 16))).buffer;
        final_data = pako.inflateRaw(compressed, { to: "string" });
      }

      if (typeof final_data === "string") {
        final_data = forge.util.decodeUtf8(final_data);
        final_data = JSON.parse(final_data) as Res;
      }

      return final_data;
    }
    catch (error) {
      if (response_body.includes("La page a expir")) {
        throw new Error("The page has expired.");
      }

      else if (response_body.includes("Votre adresse IP a ") || response_body.includes("Votre adresse IP est provisoirement suspendue")) {
        throw new Error("Your IP address is temporarily suspended.");
      }

      else if (response_body.includes("La page dem")) {
        throw new Error("The requested page does not exist.");
      }

      else if (response_body.includes("Impossible d'a")) {
        throw new Error("Page unaccessible.");
      }

      else if (response_body.includes("Vous avez d")) {
        throw new Error("You've been rate-limited.");
      }

      throw error;
    }
  }

  public writePronoteFileUploadPayload (file: PawnoteSupportedFormDataFile) {
    this.instance.order++;

    const { aes_iv, aes_key } = this.getAESEncryptionKeys();
    const order_encrypted = aes.encrypt(this.instance.order.toString(), aes_key, aes_iv);

    return {
      order: order_encrypted,
      fileID: `selecfile_1_${Date.now()}`, // `1` is a constant because we'll always upload only one file.
      md5: "",
      file
    };
  }
}
