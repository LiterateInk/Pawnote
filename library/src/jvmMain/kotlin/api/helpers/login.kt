package api.helpers

import api.SessionInfoParams
import api.private.*
import api.sessionInformation
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.*
import models.errors.BadCredentialsError
import java.nio.charset.Charset
import java.security.MessageDigest
import kotlin.text.toByteArray

enum class ModProperty {
    password
}

val baseParams = mapOf(
    "fd" to "1",
    "login" to "true"
)

fun transformCredentials (auth: CredentialsAuth, modProperty: ModProperty, identity: IdentifyResponse): CredentialsAuth {
    val username = if (identity.modeCompLog == 1) auth.username.lowercase() else auth.username

    if (identity.modeCompMdp == 1)
        when (modProperty) {
            ModProperty.password -> return auth.copy(username = username, password = auth.password.lowercase())
        }

    return auth.copy(username = username)
}

@OptIn(ExperimentalStdlibApi::class)
fun createMiddlewareKey (identity: IdentifyResponse, username: String, mod: String): ByteArray {
    val md = MessageDigest.getInstance("SHA-256")
    val hash = md.digest("${identity.alea ?: ""}${mod}".toByteArray()).toHexString(HexFormat.UpperCase)

    return (username + hash).toByteArray()
}

@OptIn(ExperimentalStdlibApi::class)
fun solveChallenge (sessionInfo: SessionInformation, identity: IdentifyResponse, key: ByteArray): String {
    val iv = sessionInfo.aesIV.hexToByteArray()

    val bytes = AES.decrypt(identity.challenge.hexToByteArray(HexFormat.UpperCase), key, iv).decodeToString()

    try {
        val unscrambled = bytes.filterIndexed {index, _ -> index % 2 == 0 }.toByteArray()

        return AES.encrypt(unscrambled, key, iv)
    } catch (err: Exception) {
        println(err.stackTraceToString())
        throw BadCredentialsError()
    }
}

@OptIn(ExperimentalStdlibApi::class)
fun switchToAuthKey (sessionInfo: SessionInformation, authentication: JsonObject, key: ByteArray): SessionInformation {
    val iv = sessionInfo.aesIV.hexToByteArray()
    val authKeyDecrypted = AES.decrypt(authentication["cle"]!!.jsonPrimitive.content.hexToByteArray(), key, iv)
    val authKey = authKeyDecrypted.decodeToString().split(",").map { char -> char.toInt().toByte() }.toByteArray().toHexString()
    return sessionInfo.copy(aesKey = authKey)
}

actual suspend fun loginCredentials (auth: CredentialsAuth): LoginResult {
    val base = clearURL(auth.url)

    val sessionInfo = sessionInformation(SessionInfoParams(
        base,
        kind = auth.kind,
        cookies = listOf(),
        params = baseParams.plus(
            "bydlg" to "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335"
        )
    ))

    val sessionInstance = instanceParameters(sessionInfo)

    val identity = identify(sessionInfo, IdentifyParameters(
        username = auth.username,
        deviceUUID = auth.deviceUUID,

        requestFirstMobileAuthentication = false,
        reuseMobileAuthentication = false,
        requestFromQRCode = false,
        useCAS = false
    ))

    val transformedCredentials = transformCredentials(auth, ModProperty.password, identity)
    val key = createMiddlewareKey(identity, transformedCredentials.username, transformedCredentials.password)

    val challenge = solveChallenge(sessionInfo, identity, key)
    val authentication = authenticate(sessionInfo, challenge)

    val finalSessionInfo = switchToAuthKey(sessionInfo, authentication, key)
    val sessionUser = userParameters(finalSessionInfo, sessionInstance)

    return LoginResult(
        session = SessionHandle(
            serverURL = base,
            information = finalSessionInfo,
            instance = sessionInstance,
            user = sessionUser
        ),
        refreshInfo = RefreshInformation(
            token = authentication["jetonConnexionAppliMobile"]!!.jsonPrimitive.content,
            username = identity.login ?: transformedCredentials.username,
            kind = transformedCredentials.kind,
            url = base
        )
    )
}