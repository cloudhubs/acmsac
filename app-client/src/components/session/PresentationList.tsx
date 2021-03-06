import {
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  Paper,
} from "@material-ui/core";
import React from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { AccordionSafeAnchor, DateTimePair } from "./util/UtilityComponents";
import PresentationEntry from "./PresentationEntry";
import { compareDates } from "./util/TimeUtils";
import { Button } from "@material-ui/core";
import ics from "../../vendor/ics.js";
import EventIcon from "@material-ui/icons/Event";

const meetingLink = (url: string) => (
  <AccordionSafeAnchor href={url}>Go to meeting room</AccordionSafeAnchor>
);

const sessionChairs = (name1: string | null, name2: string | null, first: boolean) => {
  if (!name1 && !name2) {
    return "";
  } else if (!name1 && name2) {
    name1 = name2;
  }

  return `${first? "First" : "Second"} Round Session Chair: ${name1} ${name2 && `, ${name2}`}`;
};

function PresentationList(props: { session: Session }) {
  const [selectedDay] = useGlobalState("selectedDay");
  const session = props.session;
  const papers = session.presentations;

  const calExport = (isPrimary: boolean) => {
    let cal = ics();
    let subject = session.sessionName + ", Round " + (isPrimary ? "1" : "2");
    let desc = isPrimary
      ? session.primaryMeetingLink
      : session.secondaryMeetingLink;
    let start =
      (isPrimary ? session.primaryStart : session.secondaryStart)?.toString() ??
      "";
    let end =
      (isPrimary ? session.primaryEnd : session.secondaryEnd)?.toString() ?? "";
    console.log(subject);
    console.log(desc);

    cal?.addEvent(subject, desc, "", start, end, null);
    cal?.download(session.sessionCode + "_" + (isPrimary ? "1" : "2"), ".ics");
  };

  const summary = React.useMemo(
    () => (
      <Grid container direction="column">
        <Grid item xs>
          <Typography variant="h5">
            {session.sessionName}
          </Typography>
        </Grid>
        <Grid item container direction="row">
          <Grid container item xs direction="column">
            <Grid item xs>
              <Typography variant="body1">
                {selectedDay && (
                  <DateTimePair
                    start={session.primaryStart}
                    end={session.primaryEnd}
                    assumedDate={selectedDay}
                  />
                )}{" "}
                <Typography variant="h6">
                  {session.primaryMeetingLink
                    ? meetingLink(session.primaryMeetingLink)
                    : "No room assigned"}
                </Typography>
              </Typography>
            </Grid>
            {session.secondaryStart && session.secondaryEnd && (
              <Grid item xs>
                <Typography variant="h6">
                  {selectedDay && (
                    <DateTimePair
                      start={session.secondaryStart}
                      end={session.secondaryEnd}
                      assumedDate={selectedDay}
                    />
                  )}{" "}
                  (
                  {session.secondaryMeetingLink
                    ? meetingLink(session.secondaryMeetingLink)
                    : "No room assigned"}
                  )
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs>
            {sessionChairs(session.primaryChair1, session.primaryChair2, true)}
            <br />
            {sessionChairs(session.secondaryChair1, session.secondaryChair2, false)}
            {session.trackCodes && session.trackCodes.length > 0 && (
              <>
                <br />
                Tracks:{" "}
                {session.trackCodes.map((code, i) => (
                  <>
                    {i !== 0 ? ", " : ""}
                    <AccordionSafeAnchor href={`app/track/${code}`} key={code}>
                      {code}
                    </AccordionSafeAnchor>
                  </>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} item xs>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Click on one of the following buttons to add the event to your
              calendar.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => calExport(true)}>
              First round event <EventIcon />
            </Button>
          </Grid>
          {session.secondaryStart != null && (
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => calExport(false)}>
                Second round event <EventIcon />
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    ),
    [session]
  );

  return (
    <>
      <Divider />
      <Card elevation={2}>
        <CardContent>{summary}</CardContent>
      </Card>
      <Divider />
      {papers.length > 0 && (
        <Paper>
          {papers
            .sort((p1, p2) => compareDates(p1.primaryStart, p2.primaryStart))
            .map((paper) => (
              <PresentationEntry key={paper.paperId} paper={paper} />
            ))}
        </Paper>
      )}
    </>
  );
}

export default PresentationList;
