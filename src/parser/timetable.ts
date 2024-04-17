import type { PronoteApiUserTimetable } from "~/api/user/timetable/types";
import type Pronote from "~/client/Pronote";

import { TimetableActivity, TimetableLesson } from "~/parser/timetableLesson";
import { PronoteApiLessonStatusType } from "~/constants/lessonCategory";

type TimetableOverviewParsingParameters = {
  withSuperposedCanceledLessons: boolean;
  withCanceledLessons: boolean;
  withPlannedLessons: boolean;
};

type TimetableItem = TimetableActivity | TimetableLesson;
type TimetableItemWithVisible = (TimetableItem & { __visible__?: boolean });

export class TimetableOverview {
  readonly #client: Pronote;
  readonly #lessons: TimetableItem[];
  // TODO: Add a way to parse this !!!
  readonly #absences: PronoteApiUserTimetable["response"]["donnees"]["absences"];
  readonly #withCanceledLessons: boolean;

  constructor (client: Pronote, data: PronoteApiUserTimetable["response"]["donnees"]) {
    this.#client = client;
    this.#lessons = data.ListeCours
      .map((lesson) => {
        const isActivity = "estSortiePedagogique" in lesson && lesson.estSortiePedagogique;
        const TimetableItem = isActivity ? TimetableActivity : TimetableLesson;
        return new TimetableItem(client, lesson);
      })
      .sort((a, b) => (
        a.startDate.getTime() - b.startDate.getTime()
      ));

    this.#absences = data.absences;
    this.#withCanceledLessons = data.avecCoursAnnule ?? true; // Default on Pronote is `true` apparently.
  }

  public parseLessons (parameters: TimetableOverviewParsingParameters = {
    withSuperposedCanceledLessons: false,
    withCanceledLessons: this.#withCanceledLessons,
    withPlannedLessons: true
  }): Array<TimetableItem> {
    const lessons = this.#lessons as TimetableItemWithVisible[];

    if (!parameters.withCanceledLessons) {
      for (const lesson of lessons) {
        if (lesson instanceof TimetableLesson && lesson.canceled) {
          lesson.__visible__ = false;
        }
      }
    }

    if (!parameters.withPlannedLessons) {
      for (const lesson of lessons) {
        if (
          lesson instanceof TimetableLesson &&
          lesson.__visible__ !== false &&
          !lesson.canceled &&
          [
            PronoteApiLessonStatusType.EnseignementNormal,
            PronoteApiLessonStatusType.EnseignementHistorique,
            PronoteApiLessonStatusType.EnseignementSuppleant
          ].indexOf(lesson.genre) >= 0
        ) {
          lesson.__visible__ = false;
        }
      }
    }

    if (parameters.withCanceledLessons && !parameters.withSuperposedCanceledLessons) {
      let foundInvisibleCanceled = this.#makeSuperposedCanceledLessonsInvisible(lessons);
      while (foundInvisibleCanceled) {
        foundInvisibleCanceled = this.#makeSuperposedCanceledLessonsInvisible(lessons);
      }
    }

    const parsed = lessons.filter((lesson) => lesson.__visible__ !== false);

    // Cleanup the `__visible__` property from the lessons.
    for (const lesson of lessons) {
      delete lesson.__visible__;
    }

    return parsed;
  }

  #getItemEndBlockPosition (item: TimetableActivity | TimetableLesson): number {
    const Fin = item.blockPosition + item.blockLength - 1;
    const PlacesParJour = this.#client.loginInformations.donnees.General.PlacesParJour;

    let lPlace = Fin;

    const lJourDebut = Math.floor(item.blockPosition / PlacesParJour);
    if (Math.floor(Fin / PlacesParJour) !== lJourDebut) {
      lPlace = lJourDebut * PlacesParJour + PlacesParJour - 1;
    }

    return lPlace;
  }

  #getTableauIndicesCoursSuperposesDeCours(
    lessons: (TimetableActivity | TimetableLesson)[],
    lessonIndex: number,
    aPlaceOccupees: number[]
  ) {
    const lCours = lessons[lessonIndex];
    const lCoursSuperposees = [lessonIndex];

    const lPlaceDebut = lCours.blockPosition;
    const lPlaceFin = this.#getItemEndBlockPosition(lCours);

    for (let lPlace = lPlaceDebut; lPlace <= lPlaceFin; lPlace++) {
      const lIndiceCours = aPlaceOccupees[lPlace];
      if (typeof lIndiceCours !== "undefined") {
        if (
          lIndiceCours !== lessonIndex &&
          !lCoursSuperposees.includes(lIndiceCours)
        ) {
          lCoursSuperposees.push(lIndiceCours);
        }
      }
    }

    return lCoursSuperposees;
  }

  #makeSuperposedCanceledLessonsInvisible (lessons: TimetableItemWithVisible[]): boolean {
    let lCours: TimetableItemWithVisible;
    let lCoursSuperpose: TimetableItemWithVisible;
    let lPlaceOccupees: number[] = [];

    for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++) {
      lCours = lessons[lessonIndex];

      const lPlaceDebut = lCours.blockPosition;
      const lPlaceFin = this.#getItemEndBlockPosition(lCours);

      if (lCours.__visible__ !== false) {
        for (let lPlace = lPlaceDebut; lPlace <= lPlaceFin; lPlace++) {
          if (typeof lPlaceOccupees[lPlace] === "undefined") {
            lPlaceOccupees[lPlace] = lessonIndex;
          }
          else {
            const lCoursSuperposees = this.#getTableauIndicesCoursSuperposesDeCours(
              lessons,
              lessonIndex,
              lPlaceOccupees
            );

            let lAvecCoursAnnule = false;
            let lAvecCoursNormal = false;

            for (let j = 0; j < lCoursSuperposees.length; j++) {
              lCoursSuperpose = lessons[lCoursSuperposees[j]];

              if (!lAvecCoursNormal) {
                lAvecCoursNormal = !(lCoursSuperpose instanceof TimetableLesson && lCoursSuperpose.canceled);
              }

              if (!lAvecCoursAnnule) {
                lAvecCoursAnnule = lCoursSuperpose instanceof TimetableLesson && lCoursSuperpose.canceled;
              }
            }

            if (lAvecCoursNormal && lAvecCoursAnnule) {
              for (let j = 0; j < lCoursSuperposees.length; j++) {
                lCoursSuperpose = lessons[lCoursSuperposees[j]];

                if (lCoursSuperpose && lCoursSuperpose instanceof TimetableLesson && lCoursSuperpose.canceled) {
                  lCoursSuperpose.__visible__ = false;
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
