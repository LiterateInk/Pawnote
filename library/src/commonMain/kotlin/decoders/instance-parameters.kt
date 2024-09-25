package decoders

import kotlinx.serialization.json.*
import models.InstanceParameters
import models.WeekFrequency

fun decodeInstanceParameters (parameters: JsonObject): InstanceParameters {
    val weekFrequencies: MutableMap<Int, WeekFrequency> = mutableMapOf()

    for (fortnight in 1..2) {
        val frequency = decodeDomain(parameters["General"]!!.jsonObject["DomainesFrequences"]!!.jsonArray[fortnight].jsonObject["V"]!!.jsonPrimitive.content)

        for (week in frequency)
            weekFrequencies.set(week, WeekFrequency(
                label = parameters["General"]!!.jsonObject["LibellesFrequences"]!!.jsonArray[fortnight].jsonPrimitive.content,
                fortnight
            ))
    }

    return InstanceParameters(
        version = parameters["General"]!!.jsonObject["versionPN"]!!.jsonPrimitive.content.split(".").map {vPart -> vPart.toInt()},
        nextBusinessDay = decodePronoteDate(parameters["General"]!!.jsonObject["JourOuvre"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        firstMonday = decodePronoteDate(parameters["General"]!!.jsonObject["PremierLundi"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        firstDate = decodePronoteDate(parameters["General"]!!.jsonObject["PremiereDate"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        lastDate = decodePronoteDate(parameters["General"]!!.jsonObject["DerniereDate"]!!.jsonObject["V"]!!.jsonPrimitive.content),

        navigatorIdentifier = parameters["identifiantNav"]?.jsonPrimitive?.content,
        endings = parameters["General"]!!.jsonObject["ListeHeuresFin"]!!.jsonObject["V"]!!.jsonArray.map {it.jsonObject["L"]!!.jsonPrimitive.content},
        periods = parameters["General"]!!.jsonObject["ListePeriodes"]!!.jsonArray.map { decodePeriod(it.jsonObject) },
        holidays = parameters["General"]!!.jsonObject["listeJoursFeries"]!!.jsonObject["V"]!!.jsonArray.map { decodeHoliday(it.jsonObject) },
        weekFrequencies = weekFrequencies,
        blocksPerDay = parameters["General"]!!.jsonObject["PlacesParJour"]!!.jsonPrimitive.int
    )
}