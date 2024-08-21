import { RequestFN } from "~/core/request-function";
import { decodeAssignment } from "~/decoders/assignment";
import { TabLocation, type Assignment, type Resource, type SessionHandle } from "~/models";

/**
 * Retrieve assignments from a resource.
 */
export const resourceAssignments = async (session: SessionHandle, resource: Resource): Promise<Array<Assignment>> => {
  // prevent doing an unnecessary request.
  if (!resource.haveAssignment) return [];

  const request = new RequestFN(session, "donneesContenusCDT", {
    _Signature_: { onglet: TabLocation.Resources },

    donnees: {
      pourTAF: true,
      cahierDeTextes: { N: resource.id }
    }
  });

  const response = await request.send();

  return response.data.donnees.ListeCahierDeTextes.V[0].ListeTravailAFaire.V
    .map((assignment: any) => decodeAssignment(assignment, session));
};
