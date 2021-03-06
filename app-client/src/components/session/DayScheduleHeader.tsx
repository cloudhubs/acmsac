import { Button } from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { setSelectedSession } from "./util/ReduxUtils";
import { stopEvent } from "./util/UtilityComponents";

const NOP = () => {};

function SessionHeader(props: { sessions: Session[] }) {
  let [selectedSession] = useGlobalState("selectedSession");
  let [selectedTime] = useGlobalState("selectedTime")
  const disabled = selectedTime === null || props.sessions.find((session) => session === selectedSession) === undefined;

  return (
    <>
      {props.sessions.map((session) => {
        let isSelected: boolean =
          session.sessionCode === selectedSession.sessionCode;
        return (
          <Button
            key={session.sessionCode}
            color={isSelected ? "primary" : "default"}
            variant="contained"
            onClick={isSelected ? NOP : event => {
              setSelectedSession(session);
              event.stopPropagation();
            }}
            onChange={stopEvent}
            disabled={disabled}
          >
            {session.sessionCode}
          </Button>
        );
      })}
    </>
  );
}

export default SessionHeader;
