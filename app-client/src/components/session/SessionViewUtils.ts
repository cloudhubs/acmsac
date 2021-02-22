import { Session } from "../../model/Session";
import { dispatch } from "../../state";

export const MILLIS_IN_DAY = 86400000;

const formatter = new Intl.DateTimeFormat();

/** Formatter for the time zone the local dates are based on */
const referenceTimeZone = new Intl.DateTimeFormat([], {
  timeZone: "Asia/Seoul",
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export const toTimeString = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const getTimeQualifier = (date: Date, assumedDay: Date) => {
  let diff = compareDates(assumedDay, date);
  if (diff !== 0) {
    return `(${diff < 0 ? "+1" : "-1"} day)`;
  } else {
    return "";
  }
};

export const getTimeZone = () => formatter.resolvedOptions().timeZone;

export const NOP = () => {};

export const sameDay = (dateA: Date, dateB: Date, local?: boolean) => {
  if (local)
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  return dateToNumber(dateA) === dateToNumber(dateB);
};

export const sameTime = (dateA: Date, dateB: Date) => {
  return dateA.getTime() % MILLIS_IN_DAY === dateB.getTime() % MILLIS_IN_DAY;
};

export const compareDates = (dateA: Date, dateB: Date): number => {
  if (dateA.toISOString() < dateB.toISOString()) {
    return -1;
  } else if (dateB.toISOString() < dateA.toISOString()) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * Creates a numeric representation of the provided date, rooted in KST.
 * This representation makes it so later dates are larger numbers, earlier
 * ones smaller, allowing comparison. Does not take into account the hour
 * of the day.
 *
 * @param date The date to generate a number for.
 */
export const dateToNumber = (date: Date) => {
  let parts = referenceTimeZone.formatToParts(date);
  return parseInt(
    `${parts.find((p) => p.type === "year")?.value}${
      parts.find((p) => p.type === "month")?.value
    }${parts.find((p) => p.type === "day")?.value}`
  );
};

/**
 * Compares two sessions, seeing which comes first. Assumes that the two secondary
 * sessions are the same length as the first session.
 *
 * @param sessionA First session
 * @param sessionB Second session
 */
export const compareByTime = (sessionA: Session, sessionB: Session) => {
  // Check primary start
  let diff = compareDates(sessionA.primaryStart, sessionB.primaryStart);
  if (
    diff === 0 &&
    sessionA.secondaryStart !== null &&
    sessionB.secondaryStart !== null
  ) {
    diff = compareDates(sessionA.secondaryStart, sessionB.secondaryStart);
  }

  return diff;
};

export const getDayTime = (date: Date) =>
  date.getTime() - (date.getTime() % MILLIS_IN_DAY);

export const getReferenceDay = (date: Date) =>
  referenceTimeZone.formatToParts(date).find((p) => p.type === "weekday")
    ?.value;

/** Methods to interface with the Redux store */

export const setSelectedDay = (selectedDay: Date | null) => {
  dispatch({
    selectedDay: selectedDay,
    type: "setSelectedDay",
  });
};

export const setSelectedSlot = (
  selectedTime: Date | null,
  session: Session
) => {
  dispatch({
    selectedTime: selectedTime,
    selectedSession: session,
    type: "setSelectedSlot",
  });
};

export const setSelectedSession = (selectedSession: Session) => {
  dispatch({
    session: selectedSession,
    type: "setSelectedSession",
  });
};
