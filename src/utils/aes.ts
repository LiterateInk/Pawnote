import forge from "node-forge";

class AES {
  static decrypt(data: string, key: forge.util.ByteBuffer, iv: forge.util.ByteBuffer) {
    key = forge.md.md5.create().update(key.bytes()).digest();
    iv = iv.length() ? forge.md.md5.create().update(iv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);

    const buffer = forge.util.createBuffer(forge.util.binary.hex.decode(data));
    const decipher = forge.cipher.createDecipher("AES-CBC", key);

    decipher.start({ iv });
    decipher.update(buffer);
    decipher.finish();

    return decipher.output.bytes();
  }

  static encrypt(data: string | ArrayBuffer | forge.util.ArrayBufferView | forge.util.ByteStringBuffer, key: forge.util.ByteBuffer, iv: forge.util.ByteBuffer) {
    key = forge.md.md5.create().update(key.bytes()).digest();
    iv = iv.length() ? forge.md.md5.create().update(iv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);

    data = forge.util.createBuffer(data);
    const cipher = forge.cipher.createCipher("AES-CBC", key);

    cipher.start({ iv });
    cipher.update(data);
    cipher.finish();

    return cipher.output.toHex();
  }
}

export default AES;
