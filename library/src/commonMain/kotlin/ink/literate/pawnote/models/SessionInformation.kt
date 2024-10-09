package ink.literate.pawnote.models

data class SessionInformation(
    val id: Int,
    val accountKind: AccountKind,

    /** Whether the instance is demo or not. */
    val demo: Boolean,
    val url: String,

    /** How the session is accessed. */
    val accessKind: SessionAccessKind,
    val rsaModulus: String,
    val rsaExponent: String,

    /**
     * Since PRONOTE 2023, RSA modulus and exponent are hardcoded. Before, we would need to pick
     * them up in the session object.
     *
     * Eventually, this update also added a different behavior during login phase when using
     * constants.
     *
     * That's why we have this property to know which values are there and what method we should
     * use.
     */
    val rsaFromConstants: Boolean,
    var aesKey: String,
    var aesIV: String,

    /** Whether we should skip request encryption or not. */
    val skipEncryption: Boolean,

    /** Whether we should skip request compression or not. */
    val skipCompression: Boolean,

    /**
     * Only defined and `true` when the instance doesn't have an SSL certificate that is linked
     * directly inside the PRONOTE.net server.
     *
     * On latest versions of PRONOTE, this adds an encryption layer on the request and responses.
     */
    val http: Boolean,

    /**
     * Whether polling should be used instead of presence.
     *
     * Pawnote doesn't take this into account and only sends presence requests.
     */
    val poll: Boolean,

    /**
     * Current order of requests in the queue.
     *
     * Every request made and response received increment this value by one. That means that an HTTP
     * request should increment this by 2.
     *
     * Starts with `0`.
     */
    var order: Int
)
