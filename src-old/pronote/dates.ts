import { PronoteApiLoginInformations } from "~/api/login/informations/types";

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
