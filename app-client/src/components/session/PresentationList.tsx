import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
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
  let [open, setOpen] = useState(false);

  return (
    <Accordion
      expanded={open}
      onChange={(_, open) => {
        if (papers.length !== 0) setOpen(open);
      }}
    >
      <AccordionSummary>
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
                ({meetingLink(session.primaryMeetingLink)})
              </Typography>
            </Grid>
            {session.secondaryStart &&
              session.secondaryEnd &&
              session.secondaryMeetingLink && (
                <Grid item xs>
                  <Typography variant="h6">
                    {selectedDay &&
                      dateTimePair(
                        session.secondaryStart,
                        session.secondaryEnd,
                        selectedDay
                      )}{" "}
                    ({meetingLink(session.secondaryMeetingLink)})
                  </Typography>
                </Grid>
              )}
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{session.sessionName}</Typography>
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
                    <AccordionSafeAnchor href={`app/track/${code}`}>
                      {code}
                    </AccordionSafeAnchor>
                  </>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          {papers.map((paper) => (
            <Grid item xs key={paper.title}>
              <PresentationEntry paper={paper} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default PresentationList;
