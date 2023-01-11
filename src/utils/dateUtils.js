import dayjs from "dayjs";

export const getDateDiff = (from, to, unit = "week") => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  return Math.abs(fromDate.diff(toDate, unit));
};
