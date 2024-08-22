import type { SessionHandle, TimetableClass } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { translateToWeekNumber } from "~/api";
import { translatePositionToTimings } from "~/api/helpers/timings";

export const decodeTimetableClass = (item: any, session: SessionHandle): TimetableClass => {
  const startDate = decodePronoteDate(item.DateDuCours.V);
  const blockPosition = item.place;
  const blockLength = item.duree;
  let endDate: Date;

  if (typeof item.DateDuCoursFin?.V === "string") {
    endDate = decodePronoteDate(item.DateDuCoursFin.V);
  }
  else {
    const position = blockPosition % session.instance.blocksPerDay + blockLength - 1;
    const timings = translatePositionToTimings(session, position);

    endDate = new Date(startDate);
    endDate.setHours(timings.hours, timings.minutes);
  }

  return {
    id: item.N,
    backgroundColor: item.CouleurFond,
    notes: item.memo,
    startDate,
    endDate,
    blockLength,
    blockPosition,
    weekNumber: translateToWeekNumber(startDate, session.instance.firstMonday)
  };
};
