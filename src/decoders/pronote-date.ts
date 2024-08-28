import { UnreachableError } from "~/models";

const SHORT_DATE_RE = /^\d{2}\/\d{2}\/\d{4}$/;
const LONG_DATE_LONG_HOURS_RE = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
const LONG_DATE_SHORT_HOURS_RE = /^\d{2}\/\d{2}\/\d{2} \d{2}h\d{2}$/;
const YEAR_FIRST_TWO_CHARS = new Date().getFullYear().toString().slice(0, 2);

export const decodePronoteDate = (formatted: string): Date => {
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

  throw new UnreachableError("decodePronoteDate");
};
