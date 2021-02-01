import {
  Card,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import FetchAcademicPapersBySession from "../../http/FetchAcademicPapersBySession";
import { useGlobalState } from "../../state";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair } from "./SessionViewUtils";

function PresentationList() {
  let [papers] = useGlobalState("academicPapers");
  let [session] = useGlobalState("selectedSession");
  const [token] = useGlobalState("serverToken");

  useEffect(() => {
    if (session.sessionCode !== "") {
      FetchAcademicPapersBySession.getAcademicPapersBySession(
        token,
        session.sessionCode
      );
    }
  }, [session]);

  // If no presentations found, report to user clearly
  if (papers.length === 0)
    return <Typography variant="body1">NONE FOUND</Typography>;

  // Otherwise, return the list
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">
            {dateTimePair(session.primaryStart, session.primaryEnd)} &{" "}
            {dateTimePair(session.secondaryStart, session.secondaryEnd)}
          </Typography>
          {papers.map((paper) => (
            <PresentationEntry paper={paper} />
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default PresentationList;
