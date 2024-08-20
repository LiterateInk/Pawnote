import { RequestFN } from "~/core/request-function";
import { type SessionHandle, type Homework, TabLocation } from "~/models";
import { getUTCDate } from "./private/dates";
import { translateToWeekNumber } from "./helpers/week-number";
import { decodeHomework } from "~/decoders/homework";

export const homeworkFromWeek = async (session: SessionHandle, weekNumber: number, extendsToWeekNumber?: number): Promise<Array<Homework>> => {
  const request = new RequestFN(session, "PageCahierDeTexte", {
    _Signature_: { onglet: TabLocation.Homework },
    donnees: {
      domaine: {
        _T: 8,
        V: typeof extendsToWeekNumber === "number" ? `[${weekNumber}..${extendsToWeekNumber}]` : `[${weekNumber}]`
      }
    }
  });

  const response = await request.send();
  return response.data.donnees.ListeTravauxAFaire.V.map(decodeHomework);
};

export const homeworkFromIntervals = async (session: SessionHandle, startDate: Date, endDate: Date): Promise<Array<Homework>> => {
  startDate = getUTCDate(startDate);
  endDate = getUTCDate(endDate);

  const startWeekNumber = translateToWeekNumber(startDate, session.instance.firstMonday);
  const endWeekNumber = translateToWeekNumber(endDate, session.instance.firstMonday);

  const reply = await homeworkFromWeek(session, startWeekNumber, endWeekNumber);

  // Only keep items homework are in the intervals.
  return reply.filter((homework) => startDate <= homework.deadline && homework.deadline <= endDate);
};
