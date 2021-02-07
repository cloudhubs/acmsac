import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { NOP, setSelectedSession } from "./SessionViewUtils";

function SessionHeader(props: { sessions: Session[] }) {
  let [selectedSession] = useGlobalState("selectedSession");

  return (
    <>
      {props.sessions.map((session) => {
        let isSelected: boolean =
          session.sessionCode === selectedSession.sessionCode;
        return (
          <Button
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
