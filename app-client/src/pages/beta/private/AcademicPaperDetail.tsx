import React, {useEffect} from "react";
import {useGlobalState} from "../../../state";
import { useParams } from "react-router-dom";
import PaperDetail from "../../../components/paperDetail/PaperDetail";
import FetchPresentationById from "../../../http/FetchPresentationById";

const AcademicPaperDetail = () => {

    const [token] = useGlobalState('serverToken');
    const {track, code} = useParams();
    const [serverError] = useGlobalState('serverError');

    const getById = async () => {
        await FetchPresentationById.getById(token, code);
    };

    useEffect(() => {
        getById();
    }, []);

    return (
        <>
            {!serverError.success &&
                <>
                    {serverError.message}
                    <h1>no</h1>
                    <h1>no</h1>
                    <h1>no</h1>
                    <h1>no</h1>
                    <h1>no</h1>
                    <h1>no</h1>
                </>
            }

            {serverError.success &&
                <>
                    <PaperDetail />
                </>
            }
        </>
    );
}
export default AcademicPaperDetail;
