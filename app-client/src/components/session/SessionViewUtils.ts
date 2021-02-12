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
