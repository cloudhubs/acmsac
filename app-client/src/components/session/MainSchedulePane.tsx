import React, { useEffect } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import FetchSession from "../../http/FetchSession";
import { useGlobalState } from "../../state";
import DaySchedulePane from "./DaySchedulePane";
import { Session } from "../../model/Session";
import { compareDates, dateToNumber, onReferenceDay } from "./util/TimeUtils";
import { setSelectedDay } from "./util/ReduxUtils";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      heroContent: {
        padding: theme.spacing(8, 0, 6),
      },
    })
  );
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main" className={classes.heroContent}>
      <Paper>
        {/* Header text + description */}
        <Paper>
          <Typography variant="h2">Schedule</Typography>
          <Typography variant="body1">
            The virtual conference will take place on the following days; click
            on a day to inspect the relative schedule.
            <br/>
            Please note that most of
            the events are repeated in two separate rounds to accommodate the
            needs of attendees from different time zones around the world.
          </Typography>
        </Paper>

        <Grid container direction="column">
          {createDaySchedules(sessions)}
        </Grid>
      </Paper>
    </Container>
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
