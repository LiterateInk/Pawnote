package decoders

import models.AccountKind
import models.errors.UnreachableError

/**
 * @param path mobile.eleve.html or eleve.html, both works.
 */
fun decodeAccountKindFromPath (path: String): AccountKind {
    val segments = path.split('.').toMutableList()
    segments.removeLast()

    when (segments.removeLast()) {
        "eleve" -> return AccountKind.STUDENT
        "parent" -> return AccountKind.PARENT
        "professeur" -> return AccountKind.TEACHER
    }

    throw UnreachableError("decodeAccountKindFromPath")
}