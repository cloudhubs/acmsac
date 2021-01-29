import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { dispatch, useGlobalState } from "../../state";

const setSelectedSession = (selectedSession: Session) => {
  console.log("set to " + JSON.stringify(selectedSession))
  dispatch({
    session: selectedSession,
    type: "setSelectedSession",
  });
}

function SessionHeader() {
  let [session] = useGlobalState("sessions");

  return (
    <>
      {session.map((session) => (
        <Button variant="contained" onClick={() => setSelectedSession(session)}>
          {session.sessionCode}
        </Button>
      ))}
    </>
  );
}

export default SessionHeader;
