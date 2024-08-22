import { RequestFN } from "~/core/request-function";
import { EntityState, TabLocation, type SessionHandle } from "~/models";

export const assignmentRemoveFile = async (session: SessionHandle, assignmentID: string): Promise<void> => {
  const request = new RequestFN(session, "SaisieTAFARendreEleve", {
    _Signature_: { onglet: TabLocation.Assignments },

    donnees: {
      listeFichiers: [{
        E: EntityState.DELETION,
        TAF: { N: assignmentID }
      }]
    }
  });

  await request.send();
};
