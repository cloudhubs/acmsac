import { Container, Grid, Link, Paper, TableCell, Typography } from "@material-ui/core";
import React, {useEffect} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, useHistory, useParams } from "react-router-dom";
import PaperTable from "../../../components/paperDetail/PaperTable";
import {useGlobalState} from "../../../state";
import FetchTrackByCode from "../../../http/FetchTrackByCode";
import FetchAcademicPapers from "../../../http/FetchAcademicPapers";
import TrackChat from "../../../components/chat/TrackChat";
import { DiscussionEmbed } from 'disqus-react';


const TrackDetail = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({

        }),
    );
    const classes = useStyles();
    const [token] = useGlobalState('serverToken');
    const history = useHistory();
    const {code} = useParams();

    const getTrackByCode = async () => {
        await FetchTrackByCode.getTrackByCode(token, code);
    };

    const getAcademicPapersByTrack = async () => {
        await FetchAcademicPapers.getAcademicPapersByTrack(token, code);
    };

    useEffect(() => {
        getTrackByCode();
        getAcademicPapersByTrack();
    }, []);


    return (
        <div>
            <PaperTable/>
            {/* <Container maxWidth="xl" component="main" className="chatContainer">
                <TrackChat/>
            </Container> */}
            <Container maxWidth="xl" component="main" className="disqusContainer">
                <DiscussionEmbed
                    shortname='acmsac2021'
                    config={
                        {
                            url: `https://acmsac.ecs.baylor.edu/${code}`,
                            identifier: `${code}`,
                            title: `${code}`
                        }
                    }
                />
            </Container>
        </div>
    );
}
export default TrackDetail;
