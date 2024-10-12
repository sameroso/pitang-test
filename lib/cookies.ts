export const getCookies = (cookieString: string) => {
  return cookieString
    .split("; ")
    .reduce((acc: Record<string, unknown>, curr: string) => {
      const [key, value] = curr.split("=");
      return { ...acc, [key]: JSON.parse(decodeURIComponent(value) || "") };
    }, {});
};

export const changeTimeFromDaysToMilisecondsFromCurrentDate = (
  days: number
) => {
  const date = new Date();
  const HOURS_PER_DAY = 24;
  const MINUTES_PER_HOUR = 60;
  const SECONDS_PER_MINUTE = 60;
  const MILISSECONDS_PER_SECOND = 1000;
  return date.setTime(
    date.getTime() +
      days *
        HOURS_PER_DAY *
        MINUTES_PER_HOUR *
        SECONDS_PER_MINUTE *
        MILISSECONDS_PER_SECOND
  );
};
