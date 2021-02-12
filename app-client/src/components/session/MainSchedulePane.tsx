import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import FetchSession from "../../http/FetchSession";
import { useGlobalState } from "../../state";
import DaySchedulePane from "./DaySchedulePane";
import { isCrossDaySession, Session } from "../../model/Session";
import { getDayTime } from "./SessionViewUtils";
import FetchAcademicPapers from "../../http/FetchAcademicPapers";

const SchedulePane: () => JSX.Element = () => {
  const [sessions] = useGlobalState("sessions");
  const [token] = useGlobalState("serverToken");

  // Method to retrieve all session names
  const getSessions = async () => {
    await FetchSession.getSessions(token);
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

      <Grid container direction="column">
        {createDaySchedules(sessions)}
      </Grid>
    </Paper>
  );
};

function createDaySchedules(sessions: Session[]) {
  // Filter to unique days
  let days: Map<number, Date> = new Map<number, Date>();
  for (let session of sessions) {
    let date = getDayTime(session.primaryStart);
    if (!days.has(date)) {
      days.set(date, session.primaryStart);
    }
  }

  // Create one pane per day
  let result = [] as JSX.Element[];
  let iter = days.values();
  let entry = iter.next();
  while (!entry.done) {
    result.push(
      <Grid item xs>
        <DaySchedulePane date={entry.value} />
      </Grid>
    );
    entry = iter.next();
  }
  return result;
}

export default SchedulePane;
