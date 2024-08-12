export const setDayToStart = (date: Date): void => {
  date.setHours(0, 0, 0, 0);
};

export const setDayToEnd = (date: Date): void => {
  date.setHours(23, 59, 59, 999);
};

export const getUTCTime = (date: Date): number => {
  return date.getTime() + date.getTimezoneOffset() * 60 * 1000;
};

export const getUTCDate = (date: Date): Date => {
  return new Date(getUTCTime(date));
};
