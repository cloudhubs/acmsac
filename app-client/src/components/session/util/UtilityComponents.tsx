import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { getTimeQualifier, toTimeString } from "./TimeUtils";

/*
 * Accordion Safe Anchor: a link which blocks propogation of events upward when clicked;
 * this is necessary to have a link on an accordion without having the accordion open at
 * random when attempting to use the link.
 */
type AccordionSafeAnchorProps = {
  href: string;
  children?: React.ReactNode;
};
export const stopEvent = (event) => event.stopPropagation();
export function AccordionSafeAnchor(props: AccordionSafeAnchorProps) {
  return (
    <a href={props.href} onClick={stopEvent} onFocus={stopEvent}>
      {props.children}
    </a>
  );
}

/*
 * DateTimePair: A component showing the date and time
 */
const TEXT_STYLE = "body1";

export function DateTime(props: { date: Date; assumedDate: Date }) {
  return (
    <Grid container direction="row" spacing={1}>
      <Grid xs item>
        <Typography color="inherit" variant={TEXT_STYLE}>{toTimeString(props.date)}</Typography>
      </Grid>
      <Grid xs item>
        <Typography style={{color: "red"}} variant={TEXT_STYLE}>
          {getTimeQualifier(props.date, props.assumedDate)}
        </Typography>
      </Grid>
    </Grid>
  );
}

export function DateTimePair(props: {
  start: Date;
  end: Date;
  assumedDate: Date;
}) {
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <DateTime date={props.start} assumedDate={props.assumedDate} />
      </Grid>
      <Grid item>
        <Typography variant={TEXT_STYLE}>-</Typography>
      </Grid>
      <Grid item>
        <DateTime date={props.end} assumedDate={props.assumedDate} />
      </Grid>
    </Grid>
  );
}
