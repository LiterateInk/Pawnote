import type { PronoteApiUserAttendance, ApiUserAttendance } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { transformDateToPronoteString } from "~/pronote/dates";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserAttendance = makeApiHandler<ApiUserAttendance>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserAttendance["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Attendance
    },

    donnees: {
      periode: {
        N: input.period.id,
        G: input.period.genre,
        L: input.period.name
      },

      DateDebut: {
        _T: 7,
        V: transformDateToPronoteString(input.period.start)
      },

      DateFin: {
        _T: 7,
        V: transformDateToPronoteString(input.period.end)
      }
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Attendance, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserAttendance["response"]>(response.payload);
  return { data: received };
});
