import React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import DescriptionIcon from "@material-ui/icons/Description";
import VideocamIcon from "@material-ui/icons/Videocam";
import ChatIcon from "@material-ui/icons/Chat";

import { AcademicArticle } from "../../model/AcademicArticle";
import { dateTimePair, stopEvent } from "./SessionViewUtils";
import { Person } from "../../model/Person";
import { useGlobalState } from "../../state";

type PresentationEntryProps = {
  paper: AcademicArticle;
};

const personToString = (person: Person, i: number) => {
  let prefix = i == 0 ? "" : ", ";
  return `${prefix}${person.name} (${person.affiliation}, ${person.country})`;
};

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
      {paper.trackCode && paper.id && (
        <a
          href={`app/track/${paper.trackCode}/${paper.id}`}
          onClick={stopEvent}
          onFocus={stopEvent}
        >
          <IconButton>
            <ChatIcon />
          </IconButton>
        </a>
      )}
    </>
  );
};

const PresentationEntry = (props: PresentationEntryProps) => {
  const [selectedDay] = useGlobalState("selectedDay");
  let paper = props.paper;
  return (
    <Accordion>
      <AccordionSummary>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Typography variant="body1">
              {selectedDay &&
                dateTimePair(paper.primaryStart, paper.primaryEnd, selectedDay)}
              {paper.secondaryStart && paper.secondaryEnd && (
                <>
                  <br />&<br />
                  {selectedDay &&
                    dateTimePair(
                      paper.secondaryStart,
                      paper.secondaryEnd,
                      selectedDay
                    )}
                </>
              )}
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
