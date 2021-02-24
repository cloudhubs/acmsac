import React from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

const showTimeForPanel = (time: Date, today: Date) => <DateTime date={time} assumedDate={today} />;

function TimeSlotSchedulePane(props: TimeSlotScheduleProps) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const [selectedTime] = useGlobalState("selectedTime");
  const date = props.date;

  // Create UI
  return (
    <Grid container direction="column">
      <Accordion
        expanded={selectedTime !== null && sameTime(selectedTime, date)}
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {selectedDay && (
            <Grid container direction="column">
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
            <Grid item xs key={-1}>
              <SessionHeader sessions={props.sessions} />
            </Grid>
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
    </Grid>
  );
}

export default TimeSlotSchedulePane;
