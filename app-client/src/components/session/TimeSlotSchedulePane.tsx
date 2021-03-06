import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import SessionHeader from "./DayScheduleHeader";
import PresentationList from "./PresentationList";
import { sameTime } from "./util/TimeUtils";
import { DateTime } from "./util/UtilityComponents";
import { setSelectedSlot } from "./util/ReduxUtils";

type TimeSlotScheduleProps = {
  date: Date;
  dateSecondary?: Date;
  sessions: Session[];
};

const showTimeForPanel = (time: Date, today: Date, first: boolean) => {
  let color: string = first ? "green" : "orange";
  return (
    <Grid container dir="row" spacing={1}>
      <Grid item>
        <Typography variant="body1">
          {first ? "First" : "Second"} round starts at:
        </Typography>
      </Grid>
      <Grid item style={{ color: color }}>
        <DateTime date={time} assumedDate={today} />
      </Grid>
    </Grid>
  );
};

function TimeSlotSchedulePane(props: TimeSlotScheduleProps) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const [selectedTime] = useGlobalState("selectedTime");
  const date = props.date;
  const expanded = selectedTime !== null && sameTime(selectedTime, date);

  // Create UI
  return (
    <Accordion
      color="secondary"
      variant="outlined"
      expanded={expanded}
      onChange={(_, expanded) => {
        setSelectedSlot(
          selectedDay && expanded
            ? new Date(
                selectedDay.getFullYear(),
                selectedDay.getMonth(),
                selectedDay.getDate(),
                date.getHours(),
                date.getMinutes()
              )
            : null,
          props.sessions[0]
        );
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
        <Grid container direction="column">
          {selectedDay && (
            <>
              <Grid item xs>
                {showTimeForPanel(props.date, selectedDay, true)}
              </Grid>
              {props.dateSecondary && (
                <Grid item xs>
                  {showTimeForPanel(props.dateSecondary, selectedDay, false)}
                </Grid>
              )}
            </>
          )}
          <Grid item xs key={-1}>
            <SessionHeader sessions={props.sessions} disabled={!expanded} />
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          {props.sessions
            .filter((s) => s.sessionCode === selected.sessionCode)
            .map((s) => (
              <Grid item xs key={s.primaryStart.getTime()}>
                <PresentationList session={s} />
              </Grid>
            ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default TimeSlotSchedulePane;
