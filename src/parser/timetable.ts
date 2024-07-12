import type { PronoteApiUserTimetable } from "~/api/user/timetable/types";
import type Pronote from "~/client/Pronote";

import { TimetableActivity, TimetableDetention, TimetableLesson } from "~/parser/timetableLesson";
import { PronoteApiLessonStatusType } from "~/constants/lessonCategory";

type TimetableOverviewParsingParameters = {
  withSuperposedCanceledClasses: boolean;
  withCanceledClasses: boolean;
  withPlannedClasses: boolean;
};

export type TimetableClass = TimetableActivity | TimetableLesson | TimetableDetention;
type TimetableClassWithVisible = (TimetableClass & { __visible__?: boolean });

export class TimetableOverview {
  readonly #client: Pronote;
  readonly #classes: TimetableClass[];
  // TODO: Add a way to parse this !!!
  readonly #absences: PronoteApiUserTimetable["response"]["donnees"]["absences"];
  readonly #withCanceledClasses: boolean;

  constructor (client: Pronote, data: PronoteApiUserTimetable["response"]["donnees"]) {
    this.#client = client;
    this.#classes = data.ListeCours
      .map((currentClass) => {
        let TimetableClass: typeof TimetableLesson | typeof TimetableActivity | typeof TimetableDetention;
        const isActivity = "estSortiePedagogique" in currentClass && currentClass.estSortiePedagogique;

        if (isActivity) TimetableClass = TimetableActivity;
        else {
          const isDetention = "estRetenue" in currentClass && currentClass.estRetenue;

          if (isDetention) TimetableClass = TimetableDetention;
          else TimetableClass = TimetableLesson;
        }

        return new TimetableClass(client, currentClass);
      })
      .sort((classA, classB) => (
        classA.startDate.getTime() - classB.startDate.getTime()
      ));

    this.#absences = data.absences;
    this.#withCanceledClasses = data.avecCoursAnnule ?? true; // Default on Pronote is `true` apparently.
  }

  public parse (parameters: TimetableOverviewParsingParameters = {
    withSuperposedCanceledClasses: false,
    withCanceledClasses: this.#withCanceledClasses,
    withPlannedClasses: true
  }): Array<TimetableClass> {
    const classes = this.#classes as TimetableClassWithVisible[];

    if (!parameters.withCanceledClasses) {
      for (const currentClass of classes) {
        if (currentClass instanceof TimetableLesson && currentClass.canceled) {
          currentClass.__visible__ = false;
        }
      }
    }

    if (!parameters.withPlannedClasses) {
      for (const currentClass of classes) {
        if (
          currentClass instanceof TimetableLesson &&
          currentClass.__visible__ !== false &&
          !currentClass.canceled &&
          [
            PronoteApiLessonStatusType.EnseignementNormal,
            PronoteApiLessonStatusType.EnseignementHistorique,
            PronoteApiLessonStatusType.EnseignementSuppleant
          ].indexOf(currentClass.genre) >= 0
        ) {
          currentClass.__visible__ = false;
        }
      }
    }

    if (parameters.withCanceledClasses && !parameters.withSuperposedCanceledClasses) {
      let foundInvisibleCanceled = this.#makeSuperimposedCanceledClassesInvisible(classes);
      while (foundInvisibleCanceled) {
        foundInvisibleCanceled = this.#makeSuperimposedCanceledClassesInvisible(classes);
      }
    }

    const parsed = classes.filter((currentClass) => currentClass.__visible__ !== false);

    // Cleanup the `__visible__` property.
    for (const currentClass of classes) {
      delete currentClass.__visible__;
    }

    return parsed;
  }

  #getClassEndBlockPosition (givenClass: TimetableClass): number {
    const blocksPerDay = this.#client.loginInformations.donnees.General.PlacesParJour;
    const startBlockPosition = Math.floor(givenClass.blockPosition / blocksPerDay);
    let endBlockPosition = givenClass.blockPosition + givenClass.blockLength - 1;

    if (Math.floor(endBlockPosition / blocksPerDay) !== startBlockPosition) {
      endBlockPosition = startBlockPosition * blocksPerDay + blocksPerDay - 1;
    }

    return endBlockPosition;
  }

  #getSuperimposedClassesIndexes(
    classItem: TimetableClass,
    classIndex: number,
    busyPositions: number[]
  ) {
    const classesSuperimposed = [classIndex];

    const startBlockPosition = classItem.blockPosition;
    const endBlockPosition = this.#getClassEndBlockPosition(classItem);

    for (let currentBlockPosition = startBlockPosition; currentBlockPosition <= endBlockPosition; currentBlockPosition++) {
      const busyClassIndex = busyPositions[currentBlockPosition];

      if (typeof busyClassIndex !== "undefined") {
        if (
          busyClassIndex !== classIndex &&
          !classesSuperimposed.includes(busyClassIndex)
        ) classesSuperimposed.push(busyClassIndex);
      }
    }

    return classesSuperimposed;
  }

  #makeSuperimposedCanceledClassesInvisible (classes: TimetableClassWithVisible[]): boolean {
    /** key = week number, value */
    const busyPositionsPerWeek: Record<number, number[]> = {};

    for (let classIndex = 0; classIndex < classes.length; classIndex++) {
      const currentClass = classes[classIndex];

      if (!(currentClass.weekNumber in busyPositionsPerWeek)) busyPositionsPerWeek[currentClass.weekNumber] = [];
      const busyPositions = busyPositionsPerWeek[currentClass.weekNumber];

      const startBlockPosition = currentClass.blockPosition;
      const endBlockPosition = this.#getClassEndBlockPosition(currentClass);

      if (currentClass.__visible__ !== false) {
        for (let currentBlockPosition = startBlockPosition; currentBlockPosition <= endBlockPosition; currentBlockPosition++) {
          if (typeof busyPositions[currentBlockPosition] === "undefined") {
            busyPositions[currentBlockPosition] = classIndex;
          }
          else {
            const superimposedClassesIndexes = this.#getSuperimposedClassesIndexes(
              currentClass,
              classIndex,
              busyPositions
            );

            let withCanceledClasses = false;
            let withNormalClasses = false;

            for (let j = 0; j < superimposedClassesIndexes.length; j++) {
              const superimposedClass = classes[superimposedClassesIndexes[j]];

              if (!withNormalClasses) {
                withNormalClasses = !(superimposedClass instanceof TimetableLesson && superimposedClass.canceled);
              }

              if (!withCanceledClasses) {
                withCanceledClasses = superimposedClass instanceof TimetableLesson && superimposedClass.canceled;
              }
            }

            if (withNormalClasses && withCanceledClasses) {
              for (let j = 0; j < superimposedClassesIndexes.length; j++) {
                const superimposedClass = classes[superimposedClassesIndexes[j]];

                if (superimposedClass && superimposedClass instanceof TimetableLesson && superimposedClass.canceled) {
                  superimposedClass.__visible__ = false;
                  return true;
                }
              }
            }

            break;
          }
        }
      }
    }

    return false;
  }
}
