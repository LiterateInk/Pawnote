package ink.literate.pawnote.api.helpers

import ink.literate.pawnote.models.*
import kotlin.math.floor

/**
 * Mutates the original timetable object to parse it. This method is using the official PRONOTE way
 * to parse the timetable.
 *
 * ## Why this isn't the responsibility of the internal `decodeTimetable()` ?
 *
 * Simply because it may be too overkill and not everyone would want this. We must provide the data
 * as is and let the user decide what to do with it.
 *
 * That's why we provide this helper function to parse the timetable.
 */
data class TimetableParsingOptions(
    val withSuperposedCanceledClasses: Boolean = false,
    val withCanceledClasses: Boolean,
    val withPlannedClasses: Boolean = true
)

fun getClassEndBlockPosition(instance: InstanceParameters, givenClass: TimetableClass<Any>): Int {
  val blocksPerDay = instance.blocksPerDay

  val startBlockPosition = floor(givenClass.blockPosition.toDouble() / blocksPerDay)
  var endBlockPosition = givenClass.blockPosition + givenClass.blockLength - 1

  if (floor(endBlockPosition / blocksPerDay) != startBlockPosition)
      endBlockPosition = startBlockPosition * blocksPerDay + blocksPerDay - 1

  return endBlockPosition.toInt()
}

fun getSuperimposedClassesIndexes(
    instance: InstanceParameters,
    classItem: TimetableClass<Any>,
    classIndex: Int,
    busyPositions: List<Int>
): List<Int> {
  val classesSuperimposed: MutableList<Int> = mutableListOf(classIndex)

  val startBlockPosition = classItem.blockPosition
  val endBlockPosition = getClassEndBlockPosition(instance, classItem)

  for (currentBlockPosition in startBlockPosition..endBlockPosition) {
    val busyClassIndex = busyPositions.getOrNull(currentBlockPosition)

    if (busyClassIndex != null)
        if (busyClassIndex != classIndex && !classesSuperimposed.contains(busyClassIndex))
            classesSuperimposed.add(busyClassIndex)
  }

  return classesSuperimposed
}

fun makeSuperimposedCanceledClassesInvisible(
    instance: InstanceParameters,
    classes: List<TimetableClass<Any>>,
    notVisibleClasses: MutableList<Int>
): Boolean {
  val busyPositionsPerWeek: MutableMap<Int, MutableList<Int>> = mutableMapOf()

  classes.forEachIndexed { classIndex, currentClass ->
    if (currentClass.weekNumber !in busyPositionsPerWeek)
        busyPositionsPerWeek[currentClass.weekNumber] = mutableListOf()
    val busyPositions = busyPositionsPerWeek[currentClass.weekNumber]!!

    val startBlockPosition = currentClass.blockPosition
    val endBlockPosition = getClassEndBlockPosition(instance, currentClass)

    if (classIndex !in notVisibleClasses) {
      for (currentBlockPosition in startBlockPosition..endBlockPosition) {
        if (busyPositions.getOrNull(currentBlockPosition) == -1 ||
            busyPositions.getOrNull(currentBlockPosition) == null) {
          if (currentBlockPosition > busyPositions.count() - 1) {
            for (i in busyPositions.count()..currentBlockPosition + 1) busyPositions.add(-1)
          }
          busyPositions[currentBlockPosition] = classIndex
        } else {
          val superimposedClassesIndexes =
              getSuperimposedClassesIndexes(instance, currentClass, classIndex, busyPositions)

          var withCanceledClasses = false
          var withNormalClasses = false

          for (j in 0..<superimposedClassesIndexes.count()) {
            val superimposedClass = classes[superimposedClassesIndexes[j]]

            if (!withNormalClasses) {
              withNormalClasses =
                  !(superimposedClass.data is TimetableClassLesson &&
                      superimposedClass.data.canceled)
            }

            if (!withCanceledClasses) {
              withCanceledClasses =
                  superimposedClass.data is TimetableClassLesson && superimposedClass.data.canceled
            }
          }

          if (withNormalClasses && withCanceledClasses) {
            for (j in 0..<superimposedClassesIndexes.count()) {
              val superimposedClass = classes.getOrNull(superimposedClassesIndexes[j])

              if (superimposedClass != null &&
                  superimposedClass.data is TimetableClassLesson &&
                  superimposedClass.data.canceled) {
                notVisibleClasses.add(superimposedClassesIndexes[j])
                return true
              }
            }
          }

          break
        }
      }
    }
  }

  return false
}

fun parseTimetable(
    sessionInstance: InstanceParameters,
    timetable: Timetable,
    options: TimetableParsingOptions =
        TimetableParsingOptions(withCanceledClasses = timetable.withCanceledClasses)
) {
  val classes = timetable.classes
  val notVisibleClasses: MutableList<Int> = mutableListOf()

  if (!options.withCanceledClasses)
      classes.forEachIndexed { currentIndex, current ->
        if (current.data is TimetableClassLesson && current.data.canceled)
            notVisibleClasses.add(currentIndex)
      }

  if (!options.withPlannedClasses)
      classes.forEachIndexed { currentIndex, current ->
        if (current.data is TimetableClassLesson &&
            currentIndex !in notVisibleClasses &&
            !current.data.canceled &&
            listOf(0, 3, 4).contains(current.data.kind))
            notVisibleClasses.add(currentIndex)
      }

  if (options.withCanceledClasses && !options.withSuperposedCanceledClasses) {
    var foundInvisibleCanceled = true

    while (foundInvisibleCanceled) foundInvisibleCanceled =
        makeSuperimposedCanceledClassesInvisible(sessionInstance, classes, notVisibleClasses)
  }

  timetable.classes = classes.filterIndexed { index, _ -> index !in notVisibleClasses }
}
