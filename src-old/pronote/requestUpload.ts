import type { SessionInstance, Session } from "~/session";
import type { PawnoteFetcher } from "~/utils/fetcher";

import { PronoteApiFunctions } from "~/constants/functions";
import { MOBILE_CHROME_USER_AGENT } from "~/constants/user-agent";

export enum PronoteUploadReturnType {
  UNKNOWN = 0,
  DONE = 1,
  ERROR = 2,
  UPLOADING = 3
}

export type PronoteUploadReturn =
  | {
    etat: PronoteUploadReturnType.UPLOADING
  }
  | {
    etat: PronoteUploadReturnType.ERROR | PronoteUploadReturnType.DONE | PronoteUploadReturnType.UNKNOWN
    numeroOrdre: string
  };

export const createPronoteUploadCall = async (
  fetcher: PawnoteFetcher,
  apiFunctionName: PronoteApiFunctions,
  request: {
    payload: ReturnType<Session["writePronoteFileUploadPayload"]>
    session_instance: SessionInstance
    fileName: string
  }
): Promise<void> => {
  const form = new FormData();
  form.append("numeroOrdre", request.payload.order);
  form.append("numeroSession", request.session_instance.session_id.toString());
  form.append("nomRequete", apiFunctionName);
  form.append("idFichier", request.payload.fileID);
  form.append("md5", request.payload.md5);
  // @ts-expect-error : trust me.
  form.append("files[]", request.payload.file, request.fileName);

  const pronote_url = request.session_instance.pronote_url;
  const upload_url = pronote_url + `/uploadfilesession/${request.session_instance.account_type_id}/${request.session_instance.session_id}`;

  const headers: Record<string, string> = { "User-Agent": MOBILE_CHROME_USER_AGENT };
  if (request.fileName) {
    headers["Content-Disposition"] = `attachment; filename="${encodeURI(request.fileName)}"`;
  }

  let state = PronoteUploadReturnType.UPLOADING;
  while (state === PronoteUploadReturnType.UPLOADING) {
    const response = await fetcher(upload_url, {
      method: "POST",
      body: form,
      headers
    });

    const json = await response.json<PronoteUploadReturn>();
    state = json.etat;
  }

  // Even if there's an error, it bumped.
  request.session_instance.order++;

  if (state === PronoteUploadReturnType.UNKNOWN) {
    throw new Error("The upload state is unknown.");
  }
  else if (state === PronoteUploadReturnType.ERROR) {
    throw new Error("The upload failed.");
  }
};

