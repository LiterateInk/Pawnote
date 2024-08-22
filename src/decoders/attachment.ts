import { AES } from "~/api/private/aes";
import { aesKeys } from "~/api/private/keys";
import { AttachmentKind, type SessionHandle } from "~/models";
import type { Attachment } from "~/models/attachment";

export const decodeAttachment = (attachment: any, session: SessionHandle, parameters = {}): Attachment => {
  const name = attachment.L ?? "";
  const kind = attachment.G;
  const id = attachment.N;
  let url: string;

  if (kind === AttachmentKind.Link) {
    url = attachment.url ?? name;
  }
  else {
    const { iv, key } = aesKeys(session);

    // Create an entity of the attachment.
    const data = JSON.stringify({
      N: id,
      Actif: true,

      // Depending on the case, this could be customized.
      ...parameters
    });

    const encrypted = AES.encrypt(data, key, iv);
    url = `${session.information.url}/FichiersExternes/${encrypted}/${encodeURIComponent(name)}?Session=${session.information.id}`;
  }

  return {
    kind,
    name,
    url,
    id
  };
};
