import { type SessionHandle, type Assignment, TabLocation } from "~/models";
import { decodeAssignment } from "~/decoders/assignment";
import { homeworkFromIntervals, homeworkFromWeek } from "./private/homework";

const decoder = (session: SessionHandle, data: any): Array<Assignment> => {
  return data.ListeTravauxAFaire.V.map((homework: any) => decodeAssignment(homework, session));
};

export const assignmentsFromWeek = async (session: SessionHandle, weekNumber: number, extendsToWeekNumber?: number): Promise<Array<Assignment>> => {
  const reply = await homeworkFromWeek(session, TabLocation.Assignments, weekNumber, extendsToWeekNumber);
  return decoder(session, reply);
};

export const assignmentsFromIntervals = async (session: SessionHandle, startDate: Date, endDate: Date): Promise<Array<Assignment>> => {
  const reply = await homeworkFromIntervals(session, TabLocation.Assignments, startDate, endDate);
  // Only keep items assignments are in the intervals.
  return decoder(session, reply).filter((homework) => startDate <= homework.deadline && homework.deadline <= endDate);
};
