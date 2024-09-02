package encoders

import models.AccountKind

fun encodeAccountKindToPath(kind: AccountKind): String {
    val name = when(kind) {
        AccountKind.STUDENT -> "eleve"
        AccountKind.PARENT -> "parent"
        AccountKind.TEACHER -> "professeur"
    }

    return "mobile.${name}.html"
}