import {
  Card,
  CardContent,
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import React from "react";
import { AcademicArticle } from "../../model/AcademicArticle";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair, stopEvent } from "./SessionViewUtils";

type PresentationListProps = {
  session: Session;
  papers: AcademicArticle[];
};

const meetingLink = (url: string) => (
  <Link href={url} onClick={stopEvent} onFocus={stopEvent}>
    Go to meeting room
  </Link>
);

function PresentationList(props: PresentationListProps) {
  const session = props.session;
  const papers = props.papers;

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container direction="row">
          <Grid container item xs direction="column">
            <Grid item xs>
              <Typography variant="h6">
                {dateTimePair(session.primaryStart, session.primaryEnd)} (
                {meetingLink(session.primaryMeetingLink)})
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {dateTimePair(session.secondaryStart, session.secondaryEnd)} (
                {meetingLink(session.secondaryMeetingLink)})
              </Typography>
            </Grid>
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
          {papers.length === 0 && (
            <Grid item xs>
              <Typography variant="body1">NO PRESENTATIONS FOUND</Typography>
            </Grid>
          )}
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
