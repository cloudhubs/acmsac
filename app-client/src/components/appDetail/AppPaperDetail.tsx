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
import Chat from '../chat/Chat';
import ApplicationBar from '../shared/ApplicationBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary,
            minHeight: '100%'
          }
    }),
);


export default function AppPaperDetail() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    let { track, code } = useParams();
    let [rows] = useGlobalState('academicPapers');
    // rows = rows.filter((r: AcademicArticle) => r.key === code);
    const selectedPaper: AcademicArticle = rows[0];
    // const iframe = '<iframe src="' + selectedPaper.url +'" width="540" height="450"></iframe>';

    return (
        <>
            {/* <ApplicationBar />

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
                            <h3>{selectedPaper.paperTitle}</h3>
                            <Avatar alt="Remy Sharp" src="https://s3.amazonaws.com/uifaces/faces/twitter/chacky14/128.jpg" />
                            <p>Author: {selectedPaper.author}</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid key={2} item xs={12} md={6} xl={6}>
                    <Paper className={classes.paper} elevation={3}>
                        {selectedPaper &&
                            <div>
                                {selectedPaper.paperTitle}
                                <div dangerouslySetInnerHTML={{__html: selectedPaper.iFrame}} />
                            </div>
                        }
                    </Paper>
                </Grid>

                <Grid key={3} item xs={12} md={6} xl={6}>
                    <Paper className={classes.paper} elevation={3}>
                        {selectedPaper &&
                            <div>
                                {selectedPaper.paperTitle}
                                <div dangerouslySetInnerHTML={{__html: iframe}} />
                            </div>
                        }
                    </Paper>
                </Grid>
                <Grid key={3} item xs={12} >
                    <Chat />
                </Grid>
            </Grid> */}
        </>
    );
}
