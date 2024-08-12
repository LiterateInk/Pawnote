import { PronoteApiOnglets } from "~/constants/onglets";
import type { ApiUserGeneratePDF, PronoteApiUserGeneratePDF } from "./types";
import { makeApiHandler } from "~/utils/api";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { PronoteApiFunctions } from "~/constants/functions";

export const callApiUserGeneratePDF = makeApiHandler<ApiUserGeneratePDF>(async (fetcher, input) => {
  // PRONOTE does not allow generating PDF for dynamically generated periods.
  if (input.period.id === "0") throw new Error("Cannot generate PDF for period with ID 0.");

  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserGeneratePDF["request"]>({
    donnees: {
      avecCodeCompetences: false,
      genreGenerationPDF: 2,

      options: { // defaults from PRONOTE
        adapterHauteurService: false,
        desEleves: false,
        gererRectoVerso: false,
        hauteurServiceMax: 15,
        hauteurServiceMin: 10,
        piedMonobloc: true,
        portrait: true,
        taillePolice: 6.5,
        taillePoliceMin: 5,
        taillePolicePied: 6.5,
        taillePolicePiedMin: 5
      },

      periode: {
        N: input.period.id,
        G: input.period.genre,
        L: input.period.name
      }
    },

    _Signature_: { onglet: PronoteApiOnglets.GradesReport }
  });
  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.GeneratePDF, {
    session_instance: input.session.instance,
    payload: request_payload
  });


  const received = input.session.readPronoteFunctionPayload<PronoteApiUserGeneratePDF["response"]>(response.payload);
  return { url: received.donnees.url.V };
});
