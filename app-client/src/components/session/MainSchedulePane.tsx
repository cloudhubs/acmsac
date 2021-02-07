import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import FetchSession from "../../http/FetchSession";
import { useGlobalState } from "../../state";
import DaySchedulePane from "./DaySchedulePane";
import { Session } from "../../model/Session";
import { JsxElement } from "typescript";

const SchedulePane: () => JSX.Element = () => {
  const [sessions] = useGlobalState("sessions");
  const [token] = useGlobalState("serverToken");

  // Method to retrieve all session names
  const getSessions = async () => {
    // If the tracks are already loaded, don't load again; that would be a lot of work.
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

      {createDaySchedules(sessions)}
    </Paper>
  );
};

function createDaySchedules(sessions: Session[]) {
  // Filter to unique days
  let days: Map<number, Date> = new Map<number, Date>();
  for (let session of sessions) {
    // Take the milliseconds of midnight the provided day to use as a key
    let date = session.primaryStart.getTime();
    date -= date % 86400000;
    if (!days.has(date)) days.set(date, session.primaryStart);
  }

  // Create one pane per day
  let result = [] as JSX.Element[];
  let iter = days.values();
  let entry = iter.next();
  while (!entry.done) {
    console.log(entry.value);
    result.push(<DaySchedulePane date={entry.value} />);
    entry = iter.next();
  }
  return result;
}

export default SchedulePane;
