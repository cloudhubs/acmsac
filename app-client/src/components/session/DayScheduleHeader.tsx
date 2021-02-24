import { Button } from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { setSelectedSession } from "./util/ReduxUtils";

const NOP = () => {};

function SessionHeader(props: { sessions: Session[] }) {
  let [selectedSession] = useGlobalState("selectedSession");

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
          >
            {session.sessionCode}
          </Button>
        );
      })}
    </>
  );
}

export default SessionHeader;
