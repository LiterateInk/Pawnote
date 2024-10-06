package ink.literate.pawnote.api.private

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.encoders.encodeDomain
import ink.literate.pawnote.models.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

data class NewsRemoteMutateOptions(
    val delete: Boolean = false,
    val markAsRead: Boolean = true,
    val onlyMarkAsRead: Boolean = false
)

/**
 * Updates the status of a news item.
 * Could be a read, or answer to a survey.
 */
suspend fun newsRemoteMutate (
    session: SessionHandle,
    item: NewsItem<Any>,
    options: NewsRemoteMutateOptions
) {
    val answers: List<NewsQuestion> = if (options.onlyMarkAsRead || options.delete) listOf() else (if (item.data is NewsInformation) listOf(item.data.question) else (item.data as NewsSurvey).questions)

    val request = RequestFN(session.information, "SaisieActualites", Json.encodeToString(
        buildJsonObject {
            putJsonObject("_Signature_") {
                put("onglet", TabLocation.News.code)
            }

            putJsonObject("donnees") {
                putJsonArray("listeActualites") {
                    addJsonObject {
                        put("N", item.id)
                        put("L", item.title ?: "")

                        put("genrePublic", item.public["G"]!!)
                        put("public", item.public)

                        put("validationDirecte", true)

                        putJsonArray("listeQuestions") {
                            for (answer in answers) {
                                addJsonObject {
                                    put("N", answer.id)
                                    put("L", answer.fullTitle)
                                    put("genreReponse", answer.kind.code)

                                    putJsonObject("reponse") {
                                        put("N", answer.answerId.split('#')[0].toInt())
                                        put("Actif", true)

                                        // Should give a string directly when we reply to an information
                                        // or when the question is just a text input.
                                        if (answer.kind === NewsQuestionKind.InformationText || answer.kind === NewsQuestionKind.TextInput)
                                            put("valeurReponse", answer.textInputAnswer)
                                        else
                                            putJsonObject("valeurReponse") {
                                                put("_T", 8)
                                                put("V", encodeDomain(answer.selectedAnswers ?: listOf()))
                                            }

                                        put("valeurReponseLibre", if (answer.choices.any { it.isTextInput }) answer.textInputAnswer else null)

                                        put("avecReponse", answer.answered)
                                        put("estReponseAttendue", answer.shouldAnswer)
                                        put("_validationSaisie", true)
                                    }
                                }
                            }
                        }

                        put("marqueLueSeulement", !options.delete && options.onlyMarkAsRead)
                        put("lue", !options.delete && options.markAsRead)
                        put("supprimee", !options.onlyMarkAsRead && options.delete)
                        put("saisieActualite", false)
                    }
                }

                put("saisieActualite", false)
            }
        }
    ))

    request.send()
}