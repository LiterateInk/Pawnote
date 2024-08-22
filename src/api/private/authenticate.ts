import { RequestFN } from "~/core/request-function";
import type { SessionHandle } from "~/models";

export const authenticate = async (session: SessionHandle, challenge: string) => {
  const request = new RequestFN(session, "Authentification", {
    donnees: {
      connexion: 0, // NOTE: Probably the `accessKind` property, not sure though.
      challenge,
      espace: session.information.accountKind
    }
  });

  const response = await request.send();
  const data = response.data.donnees;

  // Handle potential errors.
  if (typeof data.Acces === "number" && data.Acces !== 0) {
    let error = "Unknown error during authentication.";

    switch (data.Acces) {
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
        if (typeof data.AccesMessage !== "undefined") {
          error = data.AccesMessage.message ?? error;

          if (data.AccesMessage.titre) {
            error = `${data.AccesMessage.titre}: ${error}`;
          }
        }
    }

    throw new Error(error);
  }

  if (!data.jetonConnexionAppliMobile)
    throw new Error("Next time token wasn't given.");

  return data;
};
