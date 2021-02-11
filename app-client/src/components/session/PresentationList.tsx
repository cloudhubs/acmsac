import {
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AcademicArticle } from "../../model/AcademicArticle";
import { Session } from "../../model/Session";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair, stopEvent } from "./SessionViewUtils";

const meetingLink = (url: string) => (
  <Link href={url} onClick={stopEvent} onFocus={stopEvent}>
    Go to meeting room
  </Link>
);

function PresentationList(props: { session: Session }) {
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
                {dateTimePair(session.primaryStart, session.primaryEnd)} (
                {meetingLink(session.primaryMeetingLink)})
              </Typography>
            </Grid>
            {session.secondaryStart &&
              session.secondaryEnd &&
              session.secondaryMeetingLink && (
                <Grid item xs>
                  <Typography variant="h6">
                    {dateTimePair(session.secondaryStart, session.secondaryEnd)}{" "}
                    ({meetingLink(session.secondaryMeetingLink)})
                  </Typography>
                </Grid>
              )}
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{session.sessionName}</Typography>
          </Grid>
          <Grid item xs>
            <br />
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
