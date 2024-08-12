import type { ApiLoginAuthenticate, PronoteApiLoginAuthenticate } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiLoginAuthenticate = makeApiHandler<ApiLoginAuthenticate>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiLoginAuthenticate["request"]>({
    donnees: {
      connexion: 0,
      challenge: input.solvedChallenge.toUpperCase(),
      espace: input.session.instance.account_type_id
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Authenticate, {
    session_instance: input.session.instance,
    cookies: input.cookies ?? [],
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiLoginAuthenticate["response"]>(response.payload);

  // Handle potential errors.
  // `Acces: 0` === `EGenreErreurAcces.Aucune` -> No error.
  if (typeof received.donnees.Acces === "number" && received.donnees.Acces !== 0) {
    let error = "Erreur inconnue.";

    switch (received.donnees.Acces) {
      case 1: // EGenreErreurAcces.Identification
        error = "Your username or password is incorrect.\nPlease note that passwords are case-sensitive.";
        break;
      case 2: // EGenreErreurAcces.Autorisation
        error = "Access denied: You do not have access to this area.\nContact the school to update your authorization profile.";
        break;
      case 3: // EGenreErreurAcces.ConnexionClasse
        error = "You do not have the necessary authorizations to access displays linked to the 'In the classroom' connection mode.";
        break;
      case 4: // EGenreErreurAcces.AucuneRessource
        error = "Access denied: You do not have access to this area.\nContact the school to update your information.";
        break;
      case 5: // EGenreErreurAcces.Connexion
        error = "You do not have the necessary authorizations to access displays.";
        break;
      case 6: // EGenreErreurAcces.BloqueeEleve
        error = "Following your departure from the school, your connection to the Students' Area has been blocked.";
        break;
      case 7: // EGenreErreurAcces.FonctionAccompagnant
        error = "You do not have access to this area.\nContact the school to update your function.";
        break;
      case 8: // EGenreErreurAcces.AccompagnantAucunEleve
        error = "You do not have access to this area.\nContact the school to be assigned the students you are accompanying.";
        break;
      case 10: // EGenreErreurAcces.CompteDesactive
        error = "You do not have access to this account type. Your account has been deactivated.";
        break;
      case 9: // EGenreErreurAcces.Message
        if (typeof received.donnees.AccesMessage !== "undefined") {
          error = received.donnees.AccesMessage.message ?? error;

          if (received.donnees.AccesMessage.titre) {
            error = `${received.donnees.AccesMessage.titre}: ${error}`;
          }
        }
    }

    throw new Error(error);
  }

  return { data: received };
});
