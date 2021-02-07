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
import SessionHeader from "./SessionHeader";

type SessionSlot = {
  session: Session;
  papers: AcademicArticle[];
};

const formatter = new Intl.DateTimeFormat();

function sortSessionsByTime(a: SessionSlot, b: SessionSlot) {
  let aTime = a.session.primaryStart.getTime(),
    bTime = b.session.primaryStart.getTime();
  return bTime - aTime;
}

function SlotListComponent(props: { slots: SessionSlot[] }) {
  let sessions = props.slots
    .map((slot) => slot.session)
    .reduce((acc, session) => {
      acc.push(session);
      return acc;
    }, [] as Session[]);
  return (
    <>
      <Grid container direction="column">
        {/* If you make a session with a name like that, you DESERVE the React error you'll get. */}
        <Grid item xs key="SLOT_LIST_COMPONENT_HEADER_KEY">
          <SessionHeader sessions={sessions} />
        </Grid>
        {props.slots.sort(sortSessionsByTime).map((slot) => (
          <Grid item xs key={slot.session.sessionName}>
            <PresentationList session={slot.session} papers={slot.papers} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function DaySchedulePane(props: { date: Date }) {
  const [sessions] = useGlobalState("sessions");
  const [papers] = useGlobalState("academicPapers");
  let [slots, setSlots] = useState([] as SessionSlot[]);

  // Find sessions
  useEffect(() => {
    setSlots(
      sessions
        .filter((s) => s.primaryStart.getDate() == props.date.getDate())
        .map((s) => ({
          session: s,
          papers: papers.filter((p) => s.sessionCode == p.sessionCode),
        }))
    );
  }, [sessions]);

  // Otherwise, return the list
  return (
    <>
      <Accordion>
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
