import React, { useEffect } from "react";

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
import {
  getTimeZone,
  sameDay,
  sameTime,
  setSelectedDay,
  setSelectedSession,
} from "./SessionViewUtils";

function TimeSlotSchedulePane(props: { date: Date; sessions: Session[] }) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const date = props.date;

  useEffect(() => {
    if (
      selectedDay &&
      sameTime(selectedDay, props.date) &&
      !sameTime(selected.primaryStart, props.date) &&
      !(selected.secondaryEnd && sameTime(selected.secondaryEnd, props.date)) &&
      props.sessions.length > 0
    )
      setSelectedSession(props.sessions[0]);
  }, [selectedDay]);

  // Create UI
  return (
    <Grid container direction="column">
      <Accordion
        expanded={selectedDay !== null && sameTime(selectedDay, date)}
        onChange={(_, expanded) =>
          setSelectedDay(
            selectedDay
              ? expanded
                ? new Date(
                    selectedDay.getFullYear(),
                    selectedDay.getMonth(),
                    selectedDay.getDate(),
                    date.getHours(),
                    date.getMinutes()
                  )
                : new Date(
                    selectedDay.getFullYear(),
                    selectedDay.getMonth(),
                    selectedDay.getDate()
                  )
              : null
          )
        }
      >
        <AccordionSummary>
          <Typography variant="h6">
            {props.date.toLocaleTimeString()} {getTimeZone()}
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
