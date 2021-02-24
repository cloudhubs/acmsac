import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import FetchSession from "../../http/FetchSession";
import { useGlobalState } from "../../state";
import DaySchedulePane from "./DaySchedulePane";
import { Session } from "../../model/Session";
import { compareDates, dateToNumber, onReferenceDay } from "./util/TimeUtils";
import { setSelectedDay } from "./util/ReduxUtils";

const LOADED_SS_KEY = "acmsac_loadedtoday";

const SchedulePane: () => JSX.Element = () => {
  const [sessions] = useGlobalState("sessions");
  const [token] = useGlobalState("serverToken");

  // Method to retrieve all session names
  const setUpSchedule = () => {
    if (!sessionStorage.getItem(LOADED_SS_KEY)) {
      sessionStorage.setItem(LOADED_SS_KEY, "yes im here");
      setSelectedDay(new Date(Date.now()));
    }
    FetchSession.getSessions(token).catch(console.log);
  };

  // Start by fetching sessions and session names
  useEffect(setUpSchedule, []);

  return (
    <Paper>
      {/* Header text + description */}
      <Paper>
        <Typography variant="h1">ACM SAC 2021</Typography>
        {/* <Typography variant="body1">
          Welcome! Here is some text that gives the warm fuzzies.
          <br />
          TODO put in something meaningful :P
        </Typography> */}
      </Paper>

      <Grid container direction="column">
        {createDaySchedules(sessions)}
      </Grid>
    </Paper>
  );
};

function registerDate(date: Date, map: Map<number, Date>) {
  // Simple hash of date only
  let iso = dateToNumber(date);

  // The compiler didn't catch that this || will short-circuit if the map doesn't
  // have the key; so I can guarantee the key exists and the time will be non-null.
  if (!map.has(iso) || onReferenceDay(date, map.get(iso) as Date)) {
    map.set(iso, date);
  }
}

function createDaySchedules(sessions: Session[]) {
  // Filter to unique days
  let days: Map<number, Date> = new Map<number, Date>();
  for (let session of sessions) {
    registerDate(session.primaryStart, days);
  }

  // Create one pane per day
  let result = [] as Date[];
  let iter = days.values();
  let entry = iter.next();
  while (!entry.done) {
    result.push(entry.value);
    entry = iter.next();
  }
  return result
    .sort((a, b) => compareDates(a, b))
    .map((date) => (
      <Grid item xs key={date.getTime()}>
        <DaySchedulePane date={date} />
      </Grid>
    ));
}

export default SchedulePane;
