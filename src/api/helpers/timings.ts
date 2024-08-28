import type { SessionHandle } from "~/models";

export const translatePositionToTimings = (
  { instance: { endings } }: SessionHandle,
  position: number
): { hours: number, minutes: number } => {
  if (position > endings.length) {
    position = position % (endings.length - 1);
  }

  const formatted = endings[position];

  const [hours, minutes] = formatted.split("h").map(Number);
  return { hours, minutes };
};
