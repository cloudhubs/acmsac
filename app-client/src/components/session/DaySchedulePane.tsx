import React, { useEffect, useState } from "react";
import {
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as AccordionSummary,
  ExpansionPanelDetails as AccordionDetails,
  Typography,
  Grid,
} from "@material-ui/core";
import { AcademicArticle } from "../../model/AcademicArticle";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";
import PresentationList from "./PresentationList";
import SessionHeader from "./DayScheduleHeader";
import { setSelectedDay, setSelectedSession } from "./SessionViewUtils";

type SessionSlot = {
  session: Session;
  papers: AcademicArticle[];
};

const formatter = new Intl.DateTimeFormat();

function sortSessionsByTime(a: Session, b: Session) {
  let aTime = a.primaryStart.getTime(),
    bTime = b.primaryStart.getTime();
  return bTime - aTime;
}

function SlotListComponent(props: { slots: SessionSlot[] }) {
  const [selected] = useGlobalState("selectedSession");
  const slots = props.slots;
  let sessions = props.slots.map((slot) => slot.session);

  return (
    <>
      <Grid container direction="column">
        {/* If you make a session with a name like that, you DESERVE the React error you'll get. */}
        <Grid item xs key="SLOT_LIST_COMPONENT_HEADER_KEY">
          <SessionHeader sessions={sessions} />
        </Grid>
        {slots
          .filter((slot) => slot.session.sessionCode === selected.sessionCode)
          .map((slot) => (
            <Grid item xs key={slot.session.sessionName}>
              <PresentationList session={slot.session} papers={slot.papers} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

function DaySchedulePane(props: { date: Date }) {
  const [selected] = useGlobalState("selectedSession");
  const [selectedDay] = useGlobalState("selectedDay");
  const [sessions] = useGlobalState("sessions");
  const [papers] = useGlobalState("academicPapers");
  let [slots, setSlots] = useState([] as SessionSlot[]);

  // Find sessions
  useEffect(() => {
    setSlots(
      sessions
        .filter(
          (session) => session.primaryStart.getDate() == props.date.getDate()
        )
        .sort(sortSessionsByTime)
        .map((s) => ({
          session: s,
          papers: papers.filter((p) => s.sessionCode == p.sessionCode),
        }))
    );
  }, [sessions]);

  // If the selection changes,
  useEffect(() => {
    if (
      selectedDay !== null &&
      selectedDay.getTime() === props.date.getTime() &&
      !slots.find(
        (slot) => slot.session.sessionCode === selected.sessionCode
      ) &&
      slots.length > 0
    ) {
      console.log(`No ${selected.sessionCode}, ${JSON.stringify(slots)}`);
      setSelectedSession(slots[0].session);
    }
  }, [selectedDay]);

  // Otherwise, return the list
  return (
    <>
      <Accordion
        expanded={
          selectedDay !== null && selectedDay.getTime() === props.date.getTime()
        }
        onChange={(_, expanded) => setSelectedDay(expanded ? props.date : null)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary>
          <Typography variant="h6">{formatter.format(props.date)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {slots.length > 0 ? (
            <SlotListComponent slots={slots} />
          ) : (
            <Typography variant="body1">NONE FOUND</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default DaySchedulePane;
