package ink.literate.pawnote.api.private

import ink.literate.pawnote.models.InstanceParameters
import ink.literate.pawnote.models.SessionInformation

expect suspend fun instanceParameters(sessionInfo: SessionInformation, navigatorIdentifier: String? = null): InstanceParameters