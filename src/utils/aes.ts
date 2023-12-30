import forge from "node-forge";
import { md5 } from "./md5";

// export const aes = {
//   decrypt (data: string, {
//     key = forge.util.createBuffer(),
//     iv
//   }: {
//     key?: forge.util.ByteStringBuffer
//     iv?: forge.util.ByteStringBuffer
//   }) {
//     // IV => Generate a MD5 ByteBuffer from current IV.
//     if (iv?.length()) iv = md5(iv);
//     // No IV => Create an empty buffer of 16 bytes.
//     else iv = forge.util.createBuffer().fillWithByte(0, 16);

//     // Get the buffer.
//     const dataInBytes = forge.util.hexToBytes(data);
//     const dataBuffer = forge.util.createBuffer(dataInBytes);

//     // Start the decryption using 'AES-CBC' method.
//     const decipher = forge.cipher.createDecipher("AES-CBC", md5(key));
//     decipher.start({ iv });
//     decipher.update(dataBuffer);
//     decipher.finish();

//     // Return the decrypted value.
//     return decipher.output.bytes();
//   },

//   encrypt (data: string, {
//     key = forge.util.createBuffer(),
//     iv
//   }: {
//     key?: forge.util.ByteStringBuffer
//     iv?: forge.util.ByteStringBuffer
//   }) {
//     /**
//     * Create cipher using 'AES-CBC' method and
//     * use an MD5 ByteBuffer of the given 'key'.
//     */
//     const cipher = forge.cipher.createCipher("AES-CBC", md5(key));

//     // IV => Generate a MD5 ByteBuffer from current IV.
//     if (iv?.length()) iv = md5(iv);
//     // No IV => Create an empty buffer of 16 bytes.
//     else iv = forge.util.createBuffer().fillWithByte(0, 16);

//     // We need to encrypt `data`.
//     const bufferToEncrypt = forge.util.createBuffer(data);

//     // Start the encryption.
//     cipher.start({ iv });
//     cipher.update(bufferToEncrypt);
//     cipher.finish();

//     // Return the encrypted buffer in HEX.
//     return cipher.output.toHex();
//   }
// };

class AES {
  static decrypt(aChaine: string, aCle: forge.util.ByteBuffer, aIv: forge.util.ByteBuffer) {
    aCle = forge.md.md5.create().update(aCle.bytes()).digest();
    aIv = aIv.length() ? forge.md.md5.create().update(aIv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);
    const aChaineBuffer = forge.util.createBuffer(forge.util.hexToBytes(aChaine));
    const lChiffreur = forge.cipher.createDecipher('AES-CBC', aCle);
    lChiffreur.start({
      iv: aIv
    });
    lChiffreur.update(aChaineBuffer);
    lChiffreur.finish()
    return lChiffreur.output.bytes();
  }

  static encrypt(aChaine: string | ArrayBuffer | forge.util.ArrayBufferView | forge.util.ByteStringBuffer, aCle: forge.util.ByteBuffer, aIv: forge.util.ByteBuffer) {
    aCle = forge.md.md5.create().update(aCle.bytes()).digest();
    aIv = aIv.length() ? forge.md.md5.create().update(aIv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);
    aChaine = forge.util.createBuffer(aChaine);
    const lChiffreur = forge.cipher.createCipher('AES-CBC', aCle);
    lChiffreur.start({
      iv: aIv
    });
    lChiffreur.update(aChaine);
    lChiffreur.finish()
    return lChiffreur.output.toHex();
  }
}

export default AES;