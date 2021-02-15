import React, { useEffect } from "react";

import {
  Grid,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import SessionHeader from "./DayScheduleHeader";
import PresentationList from "./PresentationList";
import {
  getTimeZone,
  sameTime,
  setSelectedSession,
  setSelectedTime,
  toTimeString,
} from "./SessionViewUtils";

type TimeSlotScheduleProps = {
  date: Date;
  dateSecondary?: Date;
  sessions: Session[];
};

const showTimeForPanel = (time: Date, today: Date) =>
  `${toTimeString(time, today)} ${getTimeZone()}`;

function TimeSlotSchedulePane(props: TimeSlotScheduleProps) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const [selectedTime] = useGlobalState("selectedTime");
  const date = props.date;

  useEffect(() => {
    if (
      !selected.primaryStart ||
      (selectedTime &&
        sameTime(selectedTime, date) &&
        !sameTime(selected.primaryStart, date) &&
        !(selected.secondaryEnd && sameTime(selected.secondaryEnd, date)) &&
        props.sessions.length > 0)
    )
      setSelectedSession(props.sessions[0]);
  }, [selectedDay, selectedTime, selected]);

  // Create UI
  return (
    <Grid container direction="column">
      <Accordion
        expanded={selectedTime !== null && sameTime(selectedTime, date)}
        onChange={(_, expanded) =>
          setSelectedTime(
            selectedDay && expanded
              ? new Date(
                  selectedDay.getFullYear(),
                  selectedDay.getMonth(),
                  selectedDay.getDate(),
                  date.getHours(),
                  date.getMinutes()
                )
              : null
          )
        }
      >
        <AccordionSummary>
          {selectedDay && (
            <Grid container direction="row">
              <Grid item xs>
                <Typography variant="h6">
                  {showTimeForPanel(props.date, selectedDay)}
                </Typography>
              </Grid>
              {props.dateSecondary && (
                <Grid item xs>
                  <Typography variant="h6">
                    {showTimeForPanel(props.dateSecondary, selectedDay)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
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
