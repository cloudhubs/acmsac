import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import {
  compareByTime,
  compareDates,
  getReferenceDay,
  sameDay,
  setSelectedDay,
} from "./SessionViewUtils";
import TimeSlotSchedulePane from "./TimeSlotSchedulePane";

type TimeSlot = {
  time: Date;
  timeSecondary?: Date;
  sessions: Session[];
};

const makeSlots = (sessions: Session[], date: Date) => {
  let slots: Map<number, TimeSlot> = new Map<number, TimeSlot>();

  // Filter to only the slots occurring today
  let todaysSessions = sessions.filter((s) => sameDay(s.primaryStart, date));

  // Find sessions for today
  for (let session of todaysSessions) {
    let offset = 31 * (session.primaryStart.getHours() + 31 * (session.primaryStart.getMinutes() + 1));
    if (!slots.has(offset)) {
      slots.set(offset, {
        time: session.primaryStart,
        timeSecondary: session.secondaryStart
          ? session.secondaryStart
          : undefined,
        sessions: [] as Session[],
      });
    }

    // Record session to any relevant slots
    slots.get(offset)?.sessions.push(session);
  }

  // Create and return time slots... man iterators for maps are painful
  let retVal = [] as TimeSlot[];
  let iter = slots.values();
  let next = iter.next();
  while (!next.done) {
    const slot = next.value;
    slot.sessions = slot.sessions.sort((a, b) => compareByTime(a, b));
    retVal.push(next.value);
    next = iter.next();
  }
  return retVal.sort((a, b) => compareDates(a.time, b.time));
};

function DaySchedulePane(props: { date: Date }) {
  const [selectedDay] = useGlobalState("selectedDay");
  const [sessions] = useGlobalState("sessions");
  let [slots, setSlots] = useState([] as TimeSlot[]);

  // Update the 'slots'--session + papers
  const updateSlots = () => setSlots(makeSlots(sessions, props.date));
  useEffect(updateSlots, [sessions]);

  // Create UI
  return (
    <>
      <Accordion
        expanded={selectedDay !== null && sameDay(selectedDay, props.date)}
        onChange={(_, expanded) => setSelectedDay(expanded ? props.date : null)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            {getReferenceDay(props.date)}
            &nbsp;(Local start date: {props.date.toLocaleDateString()})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            {slots.length > 0 ? (
              slots.map((slot) => (
                <Grid item xs key={slot.time.getTime()}>
                  <TimeSlotSchedulePane
                    date={slot.time}
                    dateSecondary={slot.timeSecondary}
                    sessions={slot.sessions}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs>
                <Typography variant="body1">NONE FOUND</Typography>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default DaySchedulePane;
