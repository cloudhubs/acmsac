import {
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useState } from "react";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair, stopEvent } from "./SessionViewUtils";

const meetingLink = (url: string) => (
  <Link href={url} onClick={stopEvent} onFocus={stopEvent}>
    Go to meeting room
  </Link>
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
