import React from "react";
import {
  Grid,
  Typography,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  IconButton,
  GridList,
  GridListTile,
} from "@material-ui/core";

import DescriptionIcon from "@material-ui/icons/Description";
import VideocamIcon from "@material-ui/icons/Videocam";

import { AcademicArticle } from "../../model/AcademicArticle";
import { dateTimePair } from "./SessionViewUtils";
import { Person } from "../../model/Person";

type PresentationEntryProps = {
  paper: AcademicArticle;
};

const personToString = (person: Person, i: number) => {
  let prefix = i == 0 ? "" : ", ";
  return `${prefix}${person.name} (${person.affiliation}, ${person.country})`;
};

const stopEvent = (event) => event.stopPropagation();

const actions = (paper: AcademicArticle) => {
  return (
    <>
      {paper.doiUrl && (
        <a href={paper.doiUrl} onClick={stopEvent} onFocus={stopEvent}>
          <IconButton>
            <DescriptionIcon />
          </IconButton>
        </a>
      )}
      {paper.videoEmbed && (
        <a href={paper.videoEmbed} onClick={stopEvent} onFocus={stopEvent}>
          <IconButton>
            <VideocamIcon />
          </IconButton>
        </a>
      )}
    </>
  );
};

const PresentationEntry = (props: PresentationEntryProps) => {
  let paper = props.paper;
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Typography variant="body1">
              {dateTimePair(paper.primaryStart, paper.primaryEnd)}
              <br />&<br />
              {dateTimePair(paper.secondaryStart, paper.secondaryEnd)}
            </Typography>
          </Grid>
          <Grid item lg>
            <Typography variant="h6">{paper.title}</Typography>
            <Typography variant="body1">
              {paper.authors.map(personToString)}
            </Typography>
          </Grid>
          <Grid item>{actions(paper) || <br />}</Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          <em>Abstract:</em> {paper.paperAbstract}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default PresentationEntry;
