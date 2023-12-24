import forge from "node-forge";

/**
 * Generates a MD5 ByteBuffer from another ByteBuffer.
 * @param buffer - ByteBuffer to convert to MD5.
 * @returns A new ByteBuffer in MD5.
 */
export const md5 = (buffer: forge.util.ByteStringBuffer): forge.util.ByteStringBuffer =>
  forge.md.md5.create().update(buffer.bytes()).digest();