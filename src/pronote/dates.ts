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

const SHORT_DATE_RE = /^\d{2}\/\d{2}\/\d{4}$/;
const LONG_DATE_LONG_HOURS_RE = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
const LONG_DATE_SHORT_HOURS_RE = /^\d{2}\/\d{2}\/\d{2} \d{2}h\d{2}$/;
const YEAR_FIRST_TWO_CHARS = new Date().getFullYear().toString().slice(0, 2);

/**
 * Convert a date from Pronote API to a JS `Date`.
 *
 * Translated from [pronotepy](https://github.com/bain3/pronotepy/blob/5d09a8666c91466d724beb1967bf75f78ee5738e/pronotepy/dataClasses.py#L149-L159).
 */
export const readPronoteApiDate = (formatted: string): Date => {
  if (SHORT_DATE_RE.test(formatted)) {
    const [day, month, year] = formatted.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
  else if (LONG_DATE_LONG_HOURS_RE.test(formatted)) {
    const [date, time] =  formatted.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hours, minutes, seconds] = time.split(":").map(Number);

    const output = new Date(year, month - 1, day);
    output.setHours(hours, minutes, seconds);
    return output;
  }
  else if (LONG_DATE_SHORT_HOURS_RE.test(formatted)) {
    const [date, time] =  formatted.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hours, minutes] = time.split("h").map(Number);

    const output = new Date(parseInt(`${YEAR_FIRST_TWO_CHARS}${year}`), month - 1, day);
    output.setHours(hours, minutes);
    return output;
  }

  throw new Error("Could not parse date given by the API.");
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

/**
 * @returns A string formatted as `$d/$m/$yyyy $H:$M:$S`.
 * @example
 * transformDateToPronoteString(new Date());
 * // -> "21/1/2024 0:0:0"
 */
export const transformDateToPronoteString = (date: Date): string => {
  const day = date.getDate();
  const month = (date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
