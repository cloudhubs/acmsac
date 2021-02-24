import { Session } from "../../../model/Session";

const MILLIS_IN_DAY = 86400000;

const formatter = new Intl.DateTimeFormat();

/** Formatter for the time zone the local dates are based on */
const referenceTimeZone = new Intl.DateTimeFormat([], {
  timeZone: "Asia/Seoul",
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

/**
 * Determines whether the specified date and the reference day share the same day name.
 * That is, if our reference locale is a Monday in the reference time zone, is the
 * provided date also on a Monday?
 * 
 * @param date The date to check on.
 * @param assumedDate The date to compare to.
 */
export const onReferenceDay = (date: Date, assumedDate: Date) => getReferenceDay(date) === getReferenceDay(assumedDate);

//==================== Get time strings ====================

/**
 * Gets the name of the day (using local formatting) for the day
 * the provided date falls on in the reference time zone.
 *
 * @param date The date to get the reference day for
 */
export const getReferenceDay = (date: Date) =>
  referenceTimeZone.formatToParts(date).find((p) => p.type === "weekday")
    ?.value;

/**
 * Get the string representation of the current local time zone
 */
export const getTimeZone = () => formatter.resolvedOptions().timeZone;

/**
 * Convert a date into an HH:MM time string, based on the current locale.
 * @param date The date to convert
 */
export const toTimeString = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

/**
 * Generate the "+1/-1 day" for the provided date, relative to the assumed day.
 * @param date The date to compare to the reference day
 * @param assumedDay The date to use as a reference day
 */
export const getTimeQualifier = (date: Date, assumedDay: Date) => {
  if (!sameDay(date, assumedDay, true)) {
    return `(${compareDates(assumedDay, date) < 0 ? "+1" : "-1"} day)`;
  } else {
    return "";
  }
};

/**
 * Creates a numeric representation of the provided date, rooted in the
 * reference time zone. This representation makes it so later dates are
 * larger numbers, earlier ones smaller, allowing comparison. Does not
 * take into account the hour of the day.
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


//==================== Comparing dates ====================

/**
 * Determine if the two dates are on the same day
 *
 * @param dateA The first date
 * @param dateB The second date
 * @param local Whether the comparison should be done using local time,
 *              or the reference time zone. Defaults to reference time zone.
 */
export const sameDay = (dateA: Date, dateB: Date, local?: boolean) => {
  if (local)
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  return dateToNumber(dateA) === dateToNumber(dateB);
};

/**
 * Determines if the times in two dates are identical. Ignores whether
 * they are on different days.
 *
 * @param dateA The first time
 * @param dateB The second time
 */
export const sameTime = (dateA: Date, dateB: Date) => {
  return dateA.getTime() % MILLIS_IN_DAY === dateB.getTime() % MILLIS_IN_DAY;
};

/**
 * Compares the provided dates to determine which one is comes first.
 * Intended for use as a comparitor in sorting.
 *
 * @param dateA The first date
 * @param dateB The second date
 */
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
 * Compares two sessions, seeing which comes first. Assumes that the two secondary
 * sessions are the same length as the first session. Used as a comparitor for
 * session objects.
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
