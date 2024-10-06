package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.WeekFrequency

fun frequency(sessionInstance: InstanceParameters, weekNumber: Int): WeekFrequency? =
    sessionInstance.weekFrequencies[weekNumber]
