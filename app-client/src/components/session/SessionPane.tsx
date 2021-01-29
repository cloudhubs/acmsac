import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import FetchSession from "../../http/FetchSession";
import { useGlobalState } from "../../state";
import SessionHeader from "./SessionHeader";
import PresentationList from "./PresentationList";
import FetchPresentationsBySession from "../../http/FetchPresentationsBySession";
import {Session} from "../../model/Session";

const SessionPane: () => JSX.Element = () => {
  const [sessions] = useGlobalState("sessions");
  let [selectedSession] = useGlobalState("selectedSession");
  const [token] = useGlobalState("serverToken");

  // Method to retrieve all session names
  const getSessions = async () => {
    // If the tracks are already loaded, don't load again; that would be a lot of work.
    if (sessions.length === 0) {
      console.log("fetch sessions");
      await FetchSession.getSessions(token);
    }
  };

  // Start by fetching sessions and session names
  useEffect(() => {
    getSessions();
  }, []);

  return (
    <Paper>
      {/* Header text + description */}
      <Paper>
        <Typography variant="h1">ACM SAC 2021</Typography>
        <Typography variant="body1">
          Welcome! Here is some text that gives the warm fuzzies.
          <br />
          TODO put in something meaningful :P
        </Typography>
      </Paper>

      <SessionHeader />
      {selectedSession.sessionCode !== "" && <PresentationList />}
    </Paper>
  );
};

export default SessionPane;
