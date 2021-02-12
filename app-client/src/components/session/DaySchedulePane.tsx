import React, { useEffect, useState } from "react";
import {
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
  Grid,
} from "@material-ui/core";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import { formatter, MILLIS_IN_DAY, sameDay, setSelectedDay } from "./SessionViewUtils";
import TimeSlotSchedulePane from "./TimeSlotSchedulePane";

type TimeSlot = {
  time: Date;
  slots: Session[];
};

const makeSlots = (sessions: Session[], date: Date) => {
  let slots: Map<number, TimeSlot> = new Map<number, TimeSlot>();

  // Filter to only the slots occurring today
  let todaysSessions = sessions.filter(
    (s) =>
      sameDay(s.primaryStart, date) ||
      (s.secondaryEnd && sameDay(s.secondaryEnd, date))
  );

  // Find sessions for today
  for (let session of todaysSessions) {
    let offset = session.primaryStart.getTime() % MILLIS_IN_DAY;
    if (!slots.has(offset)) {
      slots.set(offset, {
        time: session.primaryStart,
        slots: [] as Session[],
      });
    }

    // Record session to any relevant slots
    slots.get(offset)?.slots.push(session);
  }

  // Create and return time slots... man iterators for maps are painful
  let retVal = [] as TimeSlot[];
  let iter = slots.values();
  let next = iter.next();
  while (!next.done) {
    retVal.push(next.value);
    next = iter.next();
  }
  return retVal;
};

function DaySchedulePane(props: { date: Date }) {
  const [selectedDay] = useGlobalState("selectedDay");
  const [sessions] = useGlobalState("sessions");
  let [slots, setSlots] = useState(
    makeSlots(sessions, props.date) as TimeSlot[]
  );

  // Update the 'slots'--session + papers
  const updateSlots = () => setSlots(makeSlots(sessions, props.date));
  useEffect(updateSlots, [sessions]);

  // Create UI
  return (
    <>
      <Accordion
        expanded={selectedDay !== null && sameDay(selectedDay, props.date)}
        onChange={(_, expanded) => setSelectedDay(expanded ? props.date : null)}
      >
        <AccordionSummary>
          <Typography variant="h6">{formatter.format(props.date)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            {slots.length > 0 ? (
              slots.map((slot) => (
                <Grid item xs key={slot.time.getTime()}>
                  <TimeSlotSchedulePane
                    date={slot.time}
                    sessions={slot.slots}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body1">NONE FOUND</Typography>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default DaySchedulePane;
