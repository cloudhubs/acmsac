import React, { useEffect } from "react";
import { CircularProgress, Container, Grid, Paper, Typography } from "@material-ui/core";
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

        <Typography variant="body1">
        <hr></hr>
        <p><b>NOTICE: Alternative zoom links:</b></p>
        <ul>
          <li>
              <b>SAC '21: MLA-3 (Round 2)</b>
              <ul>
                <li><a href="https://acm-org.zoom.us/j/97689442040?pwd=TnBMSGpScDJSUzdDalp0WGhFQWtmUT09" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">https://acm-org.zoom.us/j/97689442040?pwd=TnBMSGpScDJSUzdDalp0WGhFQWtmUT09</a></li>
                <li>Meeting ID: 976 8944 2040</li>
                <li>Passcode: 852455</li>
              </ul>
          </li>
          <li>
              <b>SAC '21: DAPP-2 (Round 2)</b>
              <ul>
                <li><a href="https://unige.zoom.us/my/jmseigneur" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">https://unige.zoom.us/my/jmseigneur</a></li>
              </ul>
          </li>
          <li>
              <b>SAC '21: IOT-2 (Round 2)</b>
              <ul>
                <li><a href="https://acm-org.zoom.us/j/97570607121?pwd=L1hFY1VRem5qTW5sT2lpR01WSUthQT09" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">https://acm-org.zoom.us/j/97570607121?pwd=L1hFY1VRem5qTW5sT2lpR01WSUthQT09</a></li>
                <li>Meeting ID: 975 7060 7121</li>
                <li>Passcode: 640396</li>
              </ul>
          </li>
          <li>
              <b>SAC ’21: SVT-3/INTOP (Round 2)</b>
              <ul>
                <li><a href="https://baylor.zoom.us/j/87243113959?pwd=blFKakNZeWVidzQ3bmFMZXVVVTNHQT09" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">https://baylor.zoom.us/j/87243113959?pwd=blFKakNZeWVidzQ3bmFMZXVVVTNHQT09</a></li>
                <li>Meeting ID: 872 4311 3959</li>
                <li>Passcode: 767626</li>
              </ul>
          </li>
          <li>
              <b>SAC '21: DS (Round 2)</b>
              <ul>
                <li><a href="https://acm-org.zoom.us/j/92343599079?pwd=R0dJNzBkeEJsSWh6aFFxRFJJT3ZPUT09" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">https://acm-org.zoom.us/j/92343599079?pwd=R0dJNzBkeEJsSWh6aFFxRFJJT3ZPUT09</a></li>
                <li>Meeting ID: 923 4359 9079</li>
                <li>Passcode: 981647</li>
              </ul>
          </li>
        </ul>
        <hr></hr>
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

  // No results? Please wait...
  if (result.length === 0) {
    return (<Grid item justify="center"><br/><Container style={{display:"inline"}}><CircularProgress /></Container></Grid>);
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
