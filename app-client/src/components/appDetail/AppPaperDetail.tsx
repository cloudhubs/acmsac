import React, {Component, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import {useGlobalState} from "../../state";
import {AcademicArticle} from "../../model/AcademicArticle";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {DetailRow} from "./DetailRow";
import Avatar from '@material-ui/core/Avatar';
import {Chat} from '../chat/Chat';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary
          }
    }),
);


export default function AppPaperDetail() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    let { track, code } = useParams();
    let [rows] = useGlobalState('academicPapers');
    console.log(rows);
    console.log(track);
    console.log(code);
    rows = rows.filter((r: AcademicArticle) => r.key === code);
    const selectedPaper: AcademicArticle = rows[0];
    console.log(selectedPaper);
    const iframe = '<iframe src="http://svacina.net/clanek.pdf" width="540" height="450"></iframe>';

    function createMarkup() {
        return {__html: iframe};
    }

    return (
        <>
            Track: {track}, Paper: {code},

            <nav>
                <Link variant="button" color="textPrimary" href="/register">
                    Register
                </Link>
            </nav>
            <Button href="/login" color="primary" variant="outlined">
                Login
            </Button>

            

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        <Grid key={1} item xs={12} md={6}>
                            <Paper className={classes.paper} elevation={3}>
                            <Avatar alt="Remy Sharp" src="https://s3.amazonaws.com/uifaces/faces/twitter/chacky14/128.jpg" />

                                { selectedPaper &&
                                    Object.entries(selectedPaper).map(([key, value]) => (
                                        <>
                                            <DetailRow key={key} value={value} />
                                        </>
                                    ))
                                }
                            </Paper>
                        </Grid>

                        <Grid key={2} item xs={12} md={6} xl={4}>
                            <Paper className={classes.paper} elevation={3}>
                                {selectedPaper &&
                                    <div>
                                        {selectedPaper.paperTitle}
                                        <div dangerouslySetInnerHTML={{__html: selectedPaper.iFrame}} />
                                    </div>

                                }
                            </Paper>
                        </Grid>

                        <Grid key={3} item xs={12} md={6} xl={4}>
                            <Paper className={classes.paper} elevation={3}>
                                {selectedPaper &&
                                    <div>
                                        {selectedPaper.paperTitle}
                                        <div dangerouslySetInnerHTML={{__html: iframe}} />
                                    </div>
                                }
                            </Paper>
                        </Grid>
                        <Grid key={3} item xs={12} md={6} xl={4}>
                            <Chat />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
