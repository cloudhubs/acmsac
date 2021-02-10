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
import {
  getDayTime,
  sameDay,
  setSelectedDay,
  setSelectedSession,
} from "./SessionViewUtils";
import FetchAcademicPapersBySession from "../../http/FetchAcademicPapersBySession";

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
  let sessions: Session[] = [];

  // Get unique slots
  for (let slot of props.slots) {
    if (
      !sessions.find(
        (storedSession) =>
          storedSession.sessionCode === slot.session.sessionCode
      )
    )
      sessions.push(slot.session);
  }

  // Generate UI
  return (
    <>
      <Grid container direction="column">
        {/* If you make a session with a name like that, you DESERVE the React error you'll get. */}
        <Grid item xs key="SLOT_LIST_COMPONENT_HEADER_KEY">
          <SessionHeader sessions={sessions} />
        </Grid>
        {slots
          .sort(
            (slotA, slotB) =>
              slotA.session.primaryStart.getUTCMilliseconds() -
              slotB.session.primaryStart.getUTCMilliseconds()
          )
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
  const [token] = useGlobalState("serverToken");
  const [selectedDay] = useGlobalState("selectedDay");
  const [sessions] = useGlobalState("sessions");
  const [papers] = useGlobalState("academicPapers");
  let [slots, setSlots] = useState([] as SessionSlot[]);

  const updatePapers = async () => {
    // If the papers are already in-memory, don't re-fetch
    if (papers.length === 0 || papers[0].sessionCode !== selected.sessionCode) {
      console.log(selected.sessionCode);
      await FetchAcademicPapersBySession.getAcademicPapersBySession(
        token,
        selected.sessionCode
      );
    }
  };

  // Update the 'slots'--session + papers
  const updateSlots = () => {
    // Set up the slots
    setSlots(
      sessions
        .filter((session) => sameDay(session.primaryStart, props.date))
        .sort(sortSessionsByTime)
        .map((s) => ({
          session: s,
          papers: papers.filter((p) => s.sessionCode == p.sessionCode),
        }))
    );
  };

  // If the selected day changes, set slots
  const updateSelectedSession = () => {
    console.log("updating selection");
    if (selectedDay !== null && sameDay(selectedDay, props.date))
      if (
        !slots.find(
          (slot) => slot.session.sessionCode === selected.sessionCode
        ) &&
        slots.length > 0
      ) {
        console.log(`set to ${slots[0].session}`);
        setSelectedSession(slots[0].session);
      }
  };

  // Set effects
  useEffect(() => {
    console.log("updating papers");
    updatePapers();
  }, [selected]);
  useEffect(() => {
    console.log("updating slots");
    updateSlots();
  }, [papers])
  useEffect(updateSelectedSession, [selectedDay]);

  // Create UI
  return (
    <>
      <Accordion
        expanded={selectedDay !== null && sameDay(selectedDay, props.date)}
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
