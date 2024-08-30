package api

import io.ktor.http.*

fun clearURL (url: String): String {
    var pronoteURL = Url(url)

    pronoteURL = Url(URLBuilder(
        protocol = pronoteURL.protocol,
        host = pronoteURL.host,
        pathSegments = when (pronoteURL.pathSegments.last().contains(".html")) {
            true -> pronoteURL.pathSegments.dropLast(1)
            false -> pronoteURL.pathSegments
        }
    ))

    return pronoteURL.toString()
}