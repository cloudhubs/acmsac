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
import AccordionSafeAnchor from "./AccordionSafeAnchor";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair } from "./SessionViewUtils";

const meetingLink = (url: string) => (
  <AccordionSafeAnchor href={url}>Go to meeting room</AccordionSafeAnchor>
);

function PresentationList(props: { session: Session }) {
  const [selectedDay] = useGlobalState("selectedDay");
  const session = props.session;
  const papers = session.presentations;

  const summary = React.useMemo(
    () => (
      <Grid container direction="row">
        <Grid container item xs direction="column">
          <Grid item xs>
            <Typography variant="h6">
              {selectedDay &&
                dateTimePair(
                  session.primaryStart,
                  session.primaryEnd,
                  selectedDay
                )}{" "}
              (
              {session.primaryMeetingLink
                ? meetingLink(session.primaryMeetingLink)
                : "No room assigned"}
              )
            </Typography>
          </Grid>
          {session.secondaryStart && session.secondaryEnd && (
            <Grid item xs>
              <Typography variant="h6">
                {selectedDay &&
                  dateTimePair(
                    session.secondaryStart,
                    session.secondaryEnd,
                    selectedDay
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
          <Typography variant="h6">
            {session.sessionCode} {session.sessionName}
          </Typography>
        </Grid>
        <Grid item xs>
          Primary Chairs: {session.primaryChair1}, {session.primaryChair2}
          <br />
          {session.secondaryChair1 &&
            session.secondaryChair2 &&
            `Secondary Chairs: ${session.secondaryChair1}, ${session.secondaryChair2}`}
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
          {papers.map((paper) => (
            <PresentationEntry key={paper.paperId} paper={paper} />
          ))}
        </Paper>
      )}
    </>
  );
}

export default PresentationList;
