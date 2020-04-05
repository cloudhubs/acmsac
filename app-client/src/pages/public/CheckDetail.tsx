import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import PaperDetail from "../../components/paperDetail/PaperDetail";
import FetchCheckDetail from "../../http/FetchCheckDetail";
import {useGlobalState} from "../../state";
import {Container, Typography} from "@material-ui/core";

const CheckDetail = () => {

    let { email, paperId } = useParams();
    const [serverError] = useGlobalState('serverError');

    const getCheckDetail = async () => {
        await FetchCheckDetail.getAcademicPaper(email, paperId);
    }

    useEffect(() => {
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        getCheckDetail();
    }, []);

    return (
        <div>

            {!serverError.success &&
            <>

                <Container maxWidth="xl" component="main" className='paperDetail {classes.heroContent}'>


                    <Typography variant="h4" align="center" color="textPrimary" component="h1">
                        {serverError.message}
                    </Typography>

                </Container>

            </>
            }

            {serverError.success &&
            <>
                <PaperDetail />
            </>
            }

        </div>
    );
}
export default CheckDetail;
