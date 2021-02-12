import React from "react";

import {
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
} from "@material-ui/core";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import SessionHeader from "./DayScheduleHeader";
import PresentationList from "./PresentationList";
import { setSelectedDay } from "./SessionViewUtils";

function TimeSlotSchedulePane(props: { date: Date; sessions: Session[] }) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const date = props.date;

  // Create UI
  return (
    <Grid container direction="column">
      <Accordion
        expanded={
          selectedDay !== null && selectedDay.getTime() === date.getTime()
        }
        onChange={(_, expanded) =>
          setSelectedDay(
            expanded
              ? date
              : new Date(date.getFullYear(), date.getMonth(), date.getDate())
          )
        }
      >
        <AccordionSummary>
          <Typography variant="h6">
            {props.date.toLocaleTimeString()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item xs>
              <SessionHeader sessions={props.sessions} />
            </Grid>
            {props.sessions
              .filter((s) => s.sessionCode === selected.sessionCode)
              .map((s) => (
                <Grid item xs>
                  <PresentationList session={s} />
                </Grid>
              ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

export default TimeSlotSchedulePane;
