package api.private

import models.InstanceParameters
import models.SessionInformation

expect suspend fun instanceParameters(sessionInfo: SessionInformation, navigatorIdentifier: String? = null): InstanceParameters