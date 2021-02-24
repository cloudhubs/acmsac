import { Session } from "../../../model/Session";
import { dispatch } from "../../../state";

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