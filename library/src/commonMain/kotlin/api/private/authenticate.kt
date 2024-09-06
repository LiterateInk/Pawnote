package api.private

import core.RequestFN
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.SessionInformation
import models.errors.AccessDeniedError
import models.errors.AuthenticateError
import models.errors.BadCredentialsError

suspend fun authenticate (sessionInfo: SessionInformation, challenge: String): JsonObject {
    val requestData = buildJsonObject {
        putJsonObject("donnees") {
            put("connexion", 0)
            put("challenge", challenge)
            put("espace", sessionInfo.accountKind.code)
        }
    }

    val request = RequestFN(sessionInfo, "Authentification", Json.encodeToString(requestData))
    val response = request.send()
    val data = Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject

    if (data["Acces"] != null)
        when (data["Acces"]!!.jsonPrimitive.int) {
            1 -> throw BadCredentialsError()
            2 -> {/*EGenreErreurAcces.Autorisation*/}
            3 -> {/*EGenreErreurAcces.ConnexionClasse*/}
            4 -> {/*EGenreErreurAcces.AucuneRessource*/}
            5 -> {/*EGenreErreurAcces.Connexion*/}
            6 -> {/*EGenreErreurAcces.BloqueeEleve*/}
            7 -> {/*EGenreErreurAcces.FonctionAccompagnant*/}
            8 -> throw AccessDeniedError()
            9 -> {
                if (data["AccesMessage"] != null) {
                    var error = data["AccesMessage"]!!.jsonObject["message"]?.jsonPrimitive?.content ?:  "(none)"

                    if (data["AccesMessage"]!!.jsonObject["titre"] != null)
                        error += "${data["AccesMessage"]!!.jsonObject["titre"]!!.jsonPrimitive.content} $error"

                    throw AuthenticateError(error)
                }
            }
        }

    return data
}