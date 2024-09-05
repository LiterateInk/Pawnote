package api.helpers

import models.CredentialsAuth
import models.LoginResult

expect suspend fun loginCredentials (auth: CredentialsAuth): LoginResult