import { Container, List } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGlobalState } from "../../../state";
import {Track} from "../../../model/Track";
import TrackTable from "../../../components/track/TrackTable";
import FetchTracks from "../../../http/FetchTracks";
import TransitionsModal from "../../../shared/TransitionModal";
import {Video} from "../../../components/paperDetail/Video";

const TrackList = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            heroContent: {
                padding: theme.spacing(8, 0, 6),
            }

        }),
    );

    const classes = useStyles();

    let { track } = useParams();

    const [token] = useGlobalState('serverToken');
    const history = useHistory();

    const getAcademicPapers = async () => {
        FetchTracks.getAllTracks(history, token);
    };

    useEffect(() => {
        getAcademicPapers();
    }, []);

    return (
        <>
            <TrackTable/>
        </>
    );
}
export default TrackList;
