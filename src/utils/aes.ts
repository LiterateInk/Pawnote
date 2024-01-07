import forge from "node-forge";

class AES {
  static decrypt(aChaine: string, aCle: forge.util.ByteBuffer, aIv: forge.util.ByteBuffer) {
    aCle = forge.md.md5.create().update(aCle.bytes()).digest();
    aIv = aIv.length() ? forge.md.md5.create().update(aIv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);
    const aChaineBuffer = forge.util.createBuffer(forge.util.hexToBytes(aChaine));
    const lChiffreur = forge.cipher.createDecipher("AES-CBC", aCle);
    lChiffreur.start({
      iv: aIv
    });
    lChiffreur.update(aChaineBuffer);
    lChiffreur.finish();
    return lChiffreur.output.bytes();
  }

  static encrypt(aChaine: string | ArrayBuffer | forge.util.ArrayBufferView | forge.util.ByteStringBuffer, aCle: forge.util.ByteBuffer, aIv: forge.util.ByteBuffer) {
    aCle = forge.md.md5.create().update(aCle.bytes()).digest();
    aIv = aIv.length() ? forge.md.md5.create().update(aIv.bytes()).digest() : forge.util.createBuffer().fillWithByte(0, 16);
    aChaine = forge.util.createBuffer(aChaine);
    const lChiffreur = forge.cipher.createCipher("AES-CBC", aCle);
    lChiffreur.start({
      iv: aIv
    });
    lChiffreur.update(aChaine);
    lChiffreur.finish();
    return lChiffreur.output.toHex();
  }
}

export default AES;
