import React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";

import DescriptionIcon from "@material-ui/icons/Description";
import VideocamIcon from "@material-ui/icons/Videocam";
import ChatIcon from "@material-ui/icons/Chat";

import { AcademicArticle } from "../../model/AcademicArticle";
import { Person } from "../../model/Person";
import { useGlobalState } from "../../state";
import { AccordionSafeAnchor, DateTimePair } from "./util/UtilityComponents";

type PresentationEntryProps = {
  paper: AcademicArticle;
};

const personToString = (person: Person, i: number) => {
  let prefix = i == 0 ? "" : ", ";
  return `${prefix}${person.name} (${person.affiliation}, ${person.country})`;
};

const actions = (paper: AcademicArticle) => {
  let paperUrl = `app/track/${paper.trackCode}/${paper.id}`;
  return (
    <>
      {paper.doiUrl && (
        <AccordionSafeAnchor href={paper.doiUrl}>
          <IconButton>
            <DescriptionIcon />
          </IconButton>
        </AccordionSafeAnchor>
      )}
      {paper.trackCode && paper.id && (
        <>
          <AccordionSafeAnchor href={paperUrl}>
            <IconButton>
              <VideocamIcon />
            </IconButton>
          </AccordionSafeAnchor>
          <AccordionSafeAnchor href={`${paperUrl}/#chat`}>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </AccordionSafeAnchor>
        </>
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
            {selectedDay && (
              <Typography variant="body1">
                <DateTimePair
                  start={paper.primaryStart}
                  end={paper.primaryEnd}
                  assumedDate={selectedDay}
                />
                {paper.secondaryStart && paper.secondaryEnd && (
                  <>
                    <br />&<br />
                    {paper.secondaryStart && paper.secondaryEnd && (
                      <DateTimePair
                        start={paper.secondaryStart}
                        end={paper.secondaryEnd}
                        assumedDate={selectedDay}
                      />
                    )}
                  </>
                )}
              </Typography>
            )}
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
