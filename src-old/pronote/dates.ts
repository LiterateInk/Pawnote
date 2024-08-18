import { PronoteApiLoginInformations } from "~/api/login/informations/types";
import { getUTCTime } from "~/utils/dates";

/**
 * Pronote's week numbers are relative to the `PremierLundi`
 * property in the `loginInformations.General` object.
 *
 * Translated from [pronotepy](https://github.com/bain3/pronotepy/blob/5d09a8666c91466d724beb1967bf75f78ee5738e/pronotepy/clients.py#L270-L273).
 */
export const translateToPronoteWeekNumber = (dateToTranslate: Date, startDay: Date): number => {
  const daysDiff = Math.floor((getUTCTime(dateToTranslate) - getUTCTime(startDay)) / (1000 * 60 * 60 * 24));
  return 1 + Math.floor(daysDiff / 7);
};

export const translatePositionToTime = (
  endHours: PronoteApiLoginInformations["response"]["donnees"]["General"]["ListeHeuresFin"]["V"],
  position: number
): { hours: number, minutes: number } => {
  if (position > endHours.length) {
    position = position % (endHours.length - 1);
  }

  const startTime = endHours.find((el) => el.G === position);

  if (!startTime) {
    throw new Error(`Could not find starting time for position ${position}`);
  }

  const formattedTime = startTime["L"];
  const [hours, minutes] = formattedTime.split("h").map(Number);

  return { hours, minutes };
};
