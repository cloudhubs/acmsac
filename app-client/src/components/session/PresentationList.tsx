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
import { AcademicArticle } from "../../model/AcademicArticle";
import { useGlobalState } from "../../state";
import PresentationEntry from "./PresentationEntry";
import { dateTimePair } from "./SessionViewUtils";

function combineDays(paper: AcademicArticle, paperSet: AcademicArticle[][]) {
  let day = paper.primaryStart.getUTCDay();
  if (!paperSet[day]) paperSet[day] = [];
  paperSet[day].push(paper);
}

function sortArticlesByDate(a: AcademicArticle, b: AcademicArticle): number {
  let aStr = a.primaryStart.toISOString(), bStr = b.primaryStart.toISOString();
  return aStr < bStr ? -1 : aStr == bStr ? 0 : 1;
}

function PresentationList() {
  let [papers] = useGlobalState("academicPapers");
  let [session] = useGlobalState("selectedSession");
  const [token] = useGlobalState("serverToken");
  const formatter = new Intl.DateTimeFormat();

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
  let paperSet: AcademicArticle[][] = [];
  papers.map((p) => combineDays(p, paperSet));
  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="row">
            <Grid item xs>
              <Typography variant="h6">
                {dateTimePair(session.primaryStart, session.primaryEnd)}
                <br />&{" "}
                {dateTimePair(session.secondaryStart, session.secondaryEnd)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{session.sessionName}</Typography>
            </Grid>
            <Grid item xs>
              <br />
            </Grid>
          </Grid>
          {paperSet.map((daysPapers, i) => (
            <Card>
              <CardContent>
                {formatter.format(daysPapers[0].primaryStart.getDay())}
                {daysPapers.sort(sortArticlesByDate).map((paper) => (
                  <PresentationEntry paper={paper} />
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default PresentationList;
