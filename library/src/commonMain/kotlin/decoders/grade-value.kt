package decoders

import models.GradeKind
import models.GradeValue

fun decodeGradeValue (grade: String): GradeValue {
    var kind = GradeKind.Grade
    var value: Double? = null

    if (grade.split('|').count() >= 2)
        kind = GradeKind.fromInt(grade.split('|')[1].toInt())
    else
        value = grade.replace(',', '.').toDouble()

    if (kind == GradeKind.AbsentZero || kind == GradeKind.UnreturnedZero)
        value = 0.00

    return GradeValue(
        kind = kind,
        points = value
    )
}