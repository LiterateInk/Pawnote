import forge from "node-forge";
import { md5 } from "./md5";

// import crypto from "crypto-js";

// class PronoteAES {
//   public static decrypt (data: string, params: {
//     key?: string | crypto.lib.WordArray
//     iv?: string | crypto.lib.WordArray
//   }): string {
//     // IV => Generate MD5 from current IV.
//     if (typeof params.iv !== "undefined") params.iv = crypto.MD5(params.iv)
//     // No IV => Create an empty buffer of 16 bytes.
//     else params.iv = crypto.lib.WordArray.create([0], 16);

//     // Empty key by default.
//     if (!params.key) params.key = crypto.lib.WordArray.create();

//     // Start the decryption using 'AES-CBC' method.
//     const decipher = crypto.AES.decrypt(data, params.key, {
//       iv: params.iv
//     });

//     return decipher.toString(crypto.enc.Utf8);
//   }
// }

export const aes = {
  decrypt (data: string, {
    key = forge.util.createBuffer(),
    iv
  }: {
    key?: forge.util.ByteStringBuffer
    iv?: forge.util.ByteStringBuffer
  }) {
    // IV => Generate a MD5 ByteBuffer from current IV.
    if (iv !== undefined && iv.length() > 0) iv = md5(iv);
    // No IV => Create an empty buffer of 16 bytes.
    else iv = forge.util.createBuffer().fillWithByte(0, 16);

    // Get the buffer.
    const dataInBytes = forge.util.hexToBytes(data);
    const dataBuffer = forge.util.createBuffer(dataInBytes);

    // Start the decryption using 'AES-CBC' method.
    const decipher = forge.cipher.createDecipher("AES-CBC", md5(key));
    decipher.start({ iv });
    decipher.update(dataBuffer);
    decipher.finish();

    // Return the decrypted value.
    return decipher.output.bytes();
  },

  encrypt (data: string, {
    key = forge.util.createBuffer(),
    iv
  }: {
    key?: forge.util.ByteStringBuffer
    iv?: forge.util.ByteStringBuffer
  }) {
    /**
    * Create cipher using 'AES-CBC' method and
    * use an MD5 ByteBuffer of the given 'key'.
    */
    const cipher = forge.cipher.createCipher("AES-CBC", md5(key));

    // IV => Generate a MD5 ByteBuffer from current IV.
    if (iv !== undefined && iv.length() > 0) iv = md5(iv);
    // No IV => Create an empty buffer of 16 bytes.
    else iv = forge.util.createBuffer().fillWithByte(0, 16);

    // We need to encrypt `data` (UTF-8).
    const bufferToEncrypt = forge.util.createBuffer(data, "utf8");

    // Start the encryption.
    cipher.start({ iv });
    cipher.update(bufferToEncrypt);
    cipher.finish();

    // Return the encrypted buffer in HEX.
    return cipher.output.toHex();
  }
};