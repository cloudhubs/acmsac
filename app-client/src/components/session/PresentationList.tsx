import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import FetchPresentationsBySession from "../../http/FetchPresentationsBySession";
import { Presentation } from "../../model/Presentation";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";

const dateString = (start: Date, end: Date) => `${start.toLocaleTimeString()} ${start.toLocaleDateString()}-${end.toLocaleDateString()} ${end.toLocaleDateString()}`;

const PresentationEntry = (pres: Presentation) => {
  return (
    <>
      <Grid container dir="row">
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

function PresentationList() {
  let [presentations] = useGlobalState("presentations");
  let [session] = useGlobalState("selectedSession");
  const [token] = useGlobalState("serverToken");
  
  useEffect(() => {
    console.log(JSON.stringify(session));
    if (session.sessionCode !== "") {
      FetchPresentationsBySession.getPresentations(token, session);
    }
  }, [session]);

  // If no presentations found, report to user clearly
  if (presentations.length === 0)
    return <Typography variant="body1">NONE FOUND</Typography>;

  // Otherwise, return the list
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">
            {dateString(session.primaryStart, session.primaryEnd)} &{" "}
            {dateString(session.secondaryStart, session.secondaryEnd)}
          </Typography>
          <Grid container dir="col">
            {presentations.map(PresentationEntry)}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default PresentationList;
