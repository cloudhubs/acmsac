import { Button } from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { setSelectedSession } from "./util/ReduxUtils";

const NOP = () => {};

function SessionHeader(props: { sessions: Session[] }) {
  let [selectedSession] = useGlobalState("selectedSession");
  const disabled =
    props.sessions.find((session) => session === selectedSession) === undefined;

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
            onClick={isSelected ? NOP : () => setSelectedSession(session)}
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
