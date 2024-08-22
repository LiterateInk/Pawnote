import { RequestFN } from "~/core/request-function";
import { decodeGradesOverview } from "~/decoders/grades-overview";
import { encodePeriod } from "~/encoders/period";
import { type Period, type GradesOverview, type SessionHandle, TabLocation } from "~/models";

/**
 * Get grades overview for a specific period.
 * Including student's grades with averages and the global averages
 */
export const gradesOverview = async (session: SessionHandle, period: Period): Promise<GradesOverview> => {
  const request = new RequestFN(session, "DernieresNotes", {
    _Signature_: { onglet: TabLocation.Grades },

    donnees: {
      Periode: encodePeriod(period)
    }
  });

  const response = await request.send();
  return decodeGradesOverview(response.data.donnees, session);
};
