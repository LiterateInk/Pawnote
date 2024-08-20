import { RequestFN } from "~/core/request-function";
import { TabLocation, type SessionHandle } from "~/models";

export const presence = async (session: SessionHandle): Promise<void> => {
  const request = new RequestFN(session, "Presence", {
    _Signature_: { onglet: TabLocation.Presence }
  });

  await request.send();
};
