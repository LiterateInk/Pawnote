package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.api.SessionInfoParams
import ink.literate.pawnote.api.private.*
import ink.literate.pawnote.api.sessionInformation
import ink.literate.pawnote.decoders.decodeAuthenticationQr
import ink.literate.pawnote.models.*
import ink.literate.pawnote.models.errors.BadCredentialsError
import ink.literate.pawnote.models.errors.SecurityError

import java.security.MessageDigest
import kotlin.text.toByteArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonPrimitive

enum class QrProperty {
    token,
    username
}

enum class ModProperty {
    password,
    token
}

val baseParams = mapOf(
    "fd" to "1",
    "login" to "true"
)

val hasSecurityModal: (authentication: JsonObject) -> Boolean = { it["actionsDoubleAuth"]?.jsonPrimitive?.boolean ?: false }

fun transformCredentials (auth: CredentialsAuth, modProperty: ModProperty, identity: IdentifyResponse): CredentialsAuth {
    val username = if (identity.modeCompLog == 1) auth.username.lowercase() else auth.username

    if (identity.modeCompMdp == 1)
        return when (modProperty) {
            ModProperty.password -> auth.copy(username = username, password = auth.password!!.lowercase())
            ModProperty.token -> auth.copy(username = username, token = auth.token!!.lowercase())
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

suspend fun loginCredentials (auth: CredentialsAuth): LoginResult {
    val base = clearURL(auth.url)

    val sessionInfo = sessionInformation(SessionInfoParams(
        base,
        kind = auth.kind,
        cookies = listOf(),
        params = baseParams.plus(
            "bydlg" to "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335"
        )
    ))

    val sessionInstance = instanceParameters(sessionInfo, auth.navigatorIdentifier)

    val identity = identify(sessionInfo, IdentifyParameters(
        username = auth.username,
        deviceUUID = auth.deviceUUID,

        requestFirstMobileAuthentication = true,
        reuseMobileAuthentication = false,
        requestFromQRCode = false,
        useCAS = false
    ))

    val transformedCredentials = transformCredentials(auth, ModProperty.password, identity)
    val key = createMiddlewareKey(identity, transformedCredentials.username, transformedCredentials.password!!)

    val challenge = solveChallenge(sessionInfo, identity, key)
    val authentication = authenticate(sessionInfo, challenge)

    val finalSessionInfo = switchToAuthKey(sessionInfo, authentication, key)

    if (hasSecurityModal(authentication))
        return switchToTokenLogin(auth)

    return finishLoginManually(base, finalSessionInfo, sessionInstance, authentication, identity, auth.username)
}

suspend fun loginToken (auth: CredentialsAuth): LoginResult {
    val base = clearURL(auth.url)

    val sessionInfo = sessionInformation(
        SessionInfoParams(
            base,
            kind = auth.kind,
            cookies = listOf(mapOf("appliMobile" to "1")),
            params = baseParams
        )
    )

    val sessionInstance = instanceParameters(sessionInfo, auth.navigatorIdentifier)

    val identity = identify(sessionInfo, IdentifyParameters(
        username = auth.username,
        deviceUUID = auth.deviceUUID,

        requestFirstMobileAuthentication = false,
        reuseMobileAuthentication = true,
        requestFromQRCode = false,
        useCAS = false
    ))

    val transformedCredentials = transformCredentials(auth, ModProperty.token, identity)
    val key = createMiddlewareKey(identity, transformedCredentials.username, transformedCredentials.token!!)

    val challenge = solveChallenge(sessionInfo, identity, key)
    val authentication = authenticate(sessionInfo, challenge)
    val finalSessionInfo = switchToAuthKey(sessionInfo, authentication, key)

    if (hasSecurityModal(authentication))
        throw SecurityError(authentication, identity, auth.username)

    return finishLoginManually(base, finalSessionInfo, sessionInstance, authentication, identity, auth.username)
}

@OptIn(ExperimentalStdlibApi::class)
suspend fun loginQrCode (info: ink.literate.pawnote.models.QrInfo): LoginResult {
    val qr = decodeAuthenticationQr(info.qr)
    val pin = info.pin.toByteArray()

    fun read (prop: QrProperty): String {
        lateinit var data: ByteArray

        when (prop) {
            QrProperty.token -> data = AES.decrypt(qr.token.hexToByteArray(), pin, ByteArray(0))
            QrProperty.username -> data = AES.decrypt(qr.username.hexToByteArray(), pin, ByteArray(0))
        }

        return data.decodeToString()
    }

    val auth = CredentialsAuth(
        url = qr.url,
        username = read(QrProperty.username),
        token = read(QrProperty.token),
        kind = qr.kind,
        deviceUUID = info.deviceUUID,
        navigatorIdentifier = info.navigatorIdentifier
    )

    val sessionInfo = sessionInformation(
        SessionInfoParams(
            base = qr.url,
            kind = qr.kind,
            cookies = listOf(mapOf("appliMobile" to "1")),
            params = baseParams
        )
    )

    val sessionInstance = instanceParameters(sessionInfo, info.navigatorIdentifier)

    val identity = identify(sessionInfo, IdentifyParameters(
            username = auth.username,
            deviceUUID = info.deviceUUID,

            requestFirstMobileAuthentication = true,
            reuseMobileAuthentication = false,
            requestFromQRCode = true,
            useCAS = false,
        )
    )

    val transformedCredentials = transformCredentials(auth, ModProperty.token, identity)
    val key = createMiddlewareKey(identity, transformedCredentials.username, transformedCredentials.token!!)

    val challenge = solveChallenge(sessionInfo, identity, key)
    val authentication = authenticate(sessionInfo, challenge)
    val finalSessionInfo = switchToAuthKey(sessionInfo, authentication, key)

    if (hasSecurityModal(authentication))
        return switchToTokenLogin(transformedCredentials)
    else
        return finishLoginManually(qr.url, finalSessionInfo, sessionInstance, authentication, identity, auth.username)
}

suspend fun switchToTokenLogin (auth: CredentialsAuth): LoginResult {
    // TODO: Add and call logout function for current `session`.

    return loginToken(auth)
}

suspend fun finishLoginManually (
    base: String,
    sessionInfo: SessionInformation,
    sessionInstance: InstanceParameters,
    authentication: JsonObject,
    identity: IdentifyResponse,
    initialUsername: String? = null
): LoginResult {
    val sessionUser = userParameters(sessionInfo, sessionInstance)
    val session = SessionHandle(
        serverURL = base,
        information = sessionInfo,
        instance = sessionInstance,
        user = sessionUser,
        userResource = sessionUser.resources[0]
    )

    return LoginResult(
        session = session,
        refreshInfo = RefreshInformation(
            token = authentication["jetonConnexionAppliMobile"]!!.jsonPrimitive.content,
            username = identity.login ?: initialUsername!!,
            kind = session.information.accountKind,
            url = session.information.url,
            navigatorIdentifier = session.instance.navigatorIdentifier
        )
    )
}