package api

import core.RequestFN
import encoders.encodePeriod
import io.ktor.http.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import models.Period
import models.SessionHandle
import models.TabLocation

/**
 * @param period - Period the grades report will be from.
 * @return URL to download the PDF file.
 */
suspend fun gradebookPDF (session: SessionHandle, period: Period): String {
    val request = RequestFN(session.information, "GenerationPDF", Json.encodeToString(
        buildJsonObject {
            putJsonObject("donnees") {
                put("avecCodeCompetences", false)
                put("genreGenerationPDF", 2)

                putJsonObject("options") {
                    put("adapterHauteurService", false)
                    put("desEleves", false)
                    put("genreRectoVerso", false)
                    put("hauteurServiceMax", 15)
                    put("hauteurServiceMin", 10)
                    put("piedMonobloc", true)
                    put("portrait", true)
                    put("taillePolice", 6.5)
                    put("taillePoliceMin", 5)
                    put("taillePolicePied", 6.5)
                    put("taillePolicePiedMin", 5)
                }

                put("periode", encodePeriod(period))
            }

            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Gradebook.code)
            }
        }
    ))

    val response = request.send()
    return session.information.url + "/" + Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject["url"]!!.jsonObject["V"]!!.jsonPrimitive.content.encodeURLQueryComponent()
}