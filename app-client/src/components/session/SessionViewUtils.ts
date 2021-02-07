import { Session } from "../../model/Session";
import { dispatch } from "../../state";

export const dateTimePair = (start: Date, end: Date) =>
  `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;

export const NOP = () => {};

export const stopEvent = (event) => event.stopPropagation();

export const sameDay = (date1: Date, date2: Date): boolean => {
  return getDayTime(date1) === getDayTime(date2);
}

export const getDayTime = (date: Date) => date.getTime() - date.getTime() % 86400000;

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
