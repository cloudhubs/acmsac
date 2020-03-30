import React, {useEffect} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {useGlobalState} from "../../../state";
import FetchTrackByCode from "../../../http/FetchTrackByCode";
import FetchAcademicPapers from "../../../http/FetchAcademicPapers";
import { useParams } from "react-router-dom";
import PaperDetail from "../../../components/paperDetail/PaperDetail";
import FetchPresentationById from "../../../http/FetchPresentationById";
import {Container, Grid} from "@material-ui/core";
import Chat from "../../../components/chat/Chat";

const AcademicPaperDetail = () => {

    const [token] = useGlobalState('serverToken');
    const {track, code} = useParams();

    const getById = async () => {
        await FetchPresentationById.getById(token, code);
    };

    useEffect(() => {
        getById();
    }, []);

    return (
        <>
            <PaperDetail />
            {/*<Container maxWidth="xl" component="main" className="chatContainer">*/}
            {/*    <Grid container spacing={4}>*/}

            {/*        <Grid item md={12}>*/}
            {/*            <Chat/>*/}

            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Container>*/}


        </>
    );
}
export default AcademicPaperDetail;
