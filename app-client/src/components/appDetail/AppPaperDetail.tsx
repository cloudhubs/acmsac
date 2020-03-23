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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: '100%',
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);


export default function AppPaperDetail() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    let { track, paper } = useParams();
    console.log("app paper detail");
    let [rows] = useGlobalState('academicPapers');
    console.log(rows);
    // let academicPapers: AcademicArticle[] = [...rows];
    rows = rows.filter((r: AcademicArticle) => r.key == paper);
    console.log(rows);
    const selectedPaper: AcademicArticle = rows[0];
    console.log(selectedPaper);


    const iframe = '<iframe src="https://www.example.com/show?data..." width="540" height="450"></iframe>';

    function createMarkup() {
        return {__html: iframe};
    }

    return (
        <>
            Track: {track}, Paper: {paper},

            <nav>
                <Link variant="button" color="textPrimary" href="/register">
                    Register
                </Link>
            </nav>
            <Button href="/login" color="primary" variant="outlined">
                Login
            </Button>

            {selectedPaper &&
                <div>
                    {selectedPaper.paperTitle}
                    <div dangerouslySetInnerHTML={{__html: selectedPaper.iFrame}} />
                </div>

            }

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {[0, 1, 2].map(value => (
                            <Grid key={value} item>
                                <Paper className={classes.paper} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
