import React, {useEffect} from "react";
import {useGlobalState} from "../../../state";
import { useParams } from "react-router-dom";
import PaperDetail from "../../../components/paperDetail/PaperDetail";
import FetchPresentationById from "../../../http/FetchPresentationById";
import {Container, Typography} from "@material-ui/core";

const AcademicPaperDetail = () => {

    console.log("academic paper detail1");

    const [token] = useGlobalState('serverToken');
    const {track, code} = useParams();
    const [serverError] = useGlobalState('serverError');
    const [selectedPaper] = useGlobalState('selectedPaper');
    console.log(selectedPaper);
    const getById = async () => {
        console.log("fetch");
        await FetchPresentationById.getById(token, code);
    };

    useEffect(() => {
        getById();
        console.log("academic paper detail2")
    }, []);

    return (
        <>
            {!serverError.success &&
                <>

                    <Container maxWidth="xl" component="main" className='paperDetail {classes.heroContent}'>


                        <Typography variant="h4" align="center" color="textPrimary" component="h1">
                            {serverError.message}
                        </Typography>

                    </Container>
                </>
            }

            {serverError.success && selectedPaper && selectedPaper.id != undefined &&
                <>
                    <PaperDetail />
                </>
            }
        </>
    );
}
export default AcademicPaperDetail;
