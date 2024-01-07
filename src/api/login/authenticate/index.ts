import { PronoteApiFunctions } from "../../../constants/functions";
import { createPronoteAPICall } from "../../../pronote/requestAPI";
import { makeApiHandler } from "../../../utils/api";
import type { ApiLoginAuthenticate, PronoteApiLoginAuthenticate } from "./types";

export const callApiLoginAuthenticate = makeApiHandler<ApiLoginAuthenticate>(async (input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiLoginAuthenticate["request"]>({
    donnees: {
      connexion: 0,
      challenge: input.solvedChallenge.toUpperCase(),
      espace: input.session.instance.account_type_id
    }
  });

  const response = await createPronoteAPICall(PronoteApiFunctions.Authenticate, {
    session_instance: input.session.instance,
    cookies: input.cookies ?? [],
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiLoginAuthenticate["response"]>(response.payload);

  // Handle potential errors.
  // TODO: Translate the errors in English.
  // `Acces: 0` === `EGenreErreurAcces.Aucune` -> No error.
  if (typeof received.donnees.Acces === "number" && received.donnees.Acces !== 0) {
    let error = "Erreur inconnue.";

    switch (received.donnees.Acces) {
      case 1: // EGenreErreurAcces.Identification
        error = "Votre identifiant ou votre mot de passe est incorrect.\nPour information, la saisie du mot de passe doit respecter les minuscules et majuscules.";
        break;
      case 2: // EGenreErreurAcces.Autorisation
        error = "Accès refusé: Vous n'avez pas accès à cet espace.\nContactez l'établissement afin qu'il mette à jour votre profil d'autorisations.";
        break;
      case 3: // EGenreErreurAcces.ConnexionClasse
        error = "Vous n'avez pas les autorisations nécessaires pour accéder aux affichages liés au mode de connexion 'Dans la classe'.";
        break;
      case 4: // EGenreErreurAcces.AucuneRessource
        error = "Accès refusé: Vous n'avez pas accès à cet espace.\nContactez l'établissement afin qu'il mette à jour votre fiche de renseignements.";
        break;
      case 5: // EGenreErreurAcces.Connexion
        error = "Vous n'avez pas les autorisations nécessaires pour accéder aux affichages";
        break;
      case 6: // EGenreErreurAcces.BloqueeEleve
        error = "Suite à votre départ de l'établissement, votre connexion à l'Espace élèves a été bloquée.";
        break;
      case 7: // EGenreErreurAcces.FonctionAccompagnant
        error = "Vous n'avez pas accès à cet espace.\nContactez l'établissement afin qu'il mette à jour votre fonction.";
        break;
      case 8: // EGenreErreurAcces.AccompagnantAucunEleve
        error = "Vous n'avez pas accès à cet espace.\nContactez l'établissement afin qu'il vous affecte les élèves que vous accompagnez.";
        break;
      case 10: // EGenreErreurAcces.CompteDesactive
        error = "Vous n'avez pas accès à cet espace.\nVotre compte a été désactivé.";
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
