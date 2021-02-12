import { Session } from "../../model/Session";
import { dispatch } from "../../state";

export const MILLIS_IN_DAY = 86400000;

export const formatter = new Intl.DateTimeFormat();

export const dateTimePair = (start: Date, end: Date) =>
  `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;

export const NOP = () => {};

export const stopEvent = (event) => event.stopPropagation();

export const sameDay = (dateA: Date, dateB: Date) =>
  dateA.getDate() === dateB.getDate() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getFullYear() === dateB.getFullYear();

export const compareDates = (dateA: Date, dateB: Date): number => {
  if (dateA.toISOString() < dateB.toISOString()) {
    return -1;
  } else if (dateB.toISOString() < dateA.toISOString()) {
    return 1;
  } else {
    return 0;
  }
}

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

export const setSelectedDay = (selectedDay: Date | null) => {
  dispatch({
    selectedDay: selectedDay,
    type: "setSelectedDay",
  });
};

export const setSelectedSession = (selectedSession: Session) => {
  dispatch({
    session: selectedSession,
    type: "setSelectedSession",
  });
};
