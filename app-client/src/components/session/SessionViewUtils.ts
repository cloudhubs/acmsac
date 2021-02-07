import { Session } from "../../model/Session";
import { dispatch } from "../../state";

export const dateTimePair = (start: Date, end: Date) =>
  `${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`;

export const NOP = () => {};

export const stopEvent = (event) => event.stopPropagation();

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
