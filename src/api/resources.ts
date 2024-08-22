import { type SessionHandle, TabLocation, type Resource } from "~/models";
import { homeworkFromWeek, homeworkFromIntervals } from "./private/homework";
import { decodeResource } from "~/decoders/resource";

const decoder = (session: SessionHandle, data: any): Array<Resource> => {
  return data.ListeCahierDeTextes.V.map((resource: any) => decodeResource(resource, session));
};

export const resourcesFromWeek = async (session: SessionHandle, weekNumber: number, extendsToWeekNumber?: number): Promise<Resource[]> => {
  const reply = await homeworkFromWeek(session, TabLocation.Resources, weekNumber, extendsToWeekNumber);
  return decoder(session, reply);
};

export const resourcesFromIntervals = async (session: SessionHandle, startDate: Date, endDate: Date): Promise<Resource[]> => {
  const reply = await homeworkFromIntervals(session, TabLocation.Resources, startDate, endDate);
  return decoder(session, reply).filter((lesson) => startDate <= lesson.endDate && lesson.endDate <= endDate);
};
