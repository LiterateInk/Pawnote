import { type PronoteApiAttachment, PronoteApiAttachmentType } from "../constants/attachments";
import type Pronote from "../client/Pronote";
import AES from "../utils/aes";

export class StudentAttachment {
  public id: string;
  public url: string;
  public name: string;
  public type: PronoteApiAttachmentType;

  constructor (
    client: Pronote,
    attachment: PronoteApiAttachment
  ) {
    this.name = attachment.L ?? "";
    this.type = attachment.G;
    this.id = attachment.N;

    if (this.type === PronoteApiAttachmentType.Link) {
      this.url = attachment.url ?? this.name;
    }
    else {
      const { aes_iv, aes_key } = client.getAESEncryptionKeys();

      // Some magical stuff Pronote requires.
      const data = JSON.stringify({
        N: this.id,
        Actif: true
      });

      // Encrypt that magical stuff to add it in the URL.
      const encrypted = AES.encrypt(data, aes_key, aes_iv);
      this.url = `${client.pronoteRootURL}/FichiersExternes/${encrypted}/${encodeURIComponent(this.name)}?Session=${client.sessionID}`;
    }
  }
}
