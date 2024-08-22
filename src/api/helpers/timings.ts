import type { SessionHandle } from "~/models";

export const translatePositionToTimings = (
  { instance: { endings } }: SessionHandle,
  position: number
): { hours: number, minutes: number } => {
  if (position > endings.length) {
    position = position % (endings.length - 1);
  }

  const formatted = endings[position];

  if (!formatted) {
    throw new Error(`Could not find starting time for position ${position}`);
  }

  const [hours, minutes] = formatted.split("h").map(Number);
  return { hours, minutes };
};
