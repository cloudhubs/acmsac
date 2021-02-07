import {
  Card,
  CardContent,
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
} from "@material-ui/core";
import React from "react";
import { AcademicArticle } from "../../model/AcademicArticle";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair } from "./SessionViewUtils";

type PresentationListProps = {
  session: Session;
  papers: AcademicArticle[];
};

function combineDays(paper: AcademicArticle, paperSet: AcademicArticle[][]) {
  let day = paper.primaryStart.getUTCDay();
  if (!paperSet[day]) paperSet[day] = [];
  paperSet[day].push(paper);
}

function sortArticlesByDate(a: AcademicArticle, b: AcademicArticle): number {
  let aStr = a.primaryStart.toISOString(),
    bStr = b.primaryStart.toISOString();
  return aStr < bStr ? -1 : aStr == bStr ? 0 : 1;
}

function PresentationList(props: PresentationListProps) {
  let [selected] = useGlobalState("selectedSession");
  const session = props.session;
  const papers = props.papers;

  // If no presentations found, report to user clearly
  if (papers.length === 0)
    return (
      <Accordion disabled expanded={false}>
        <AccordionSummary>
          <Typography variant="body1">No papers in this session</Typography>
        </AccordionSummary>
      </Accordion>
    );

  // Otherwise, return the list
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container direction="row">
          <Grid item xs>
            <Typography variant="h6">
              {dateTimePair(session.primaryStart, session.primaryEnd)}
              <br />&{" "}
              {dateTimePair(session.secondaryStart, session.secondaryEnd)}
            </Typography>
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
