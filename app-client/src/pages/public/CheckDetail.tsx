import React, {useEffect} from "react";
import {AcademicArticle} from "../../model/AcademicArticle";
import {dispatch} from "../../state";
import { useParams } from "react-router-dom";
import PaperDetail from "../../components/paperDetail/PaperDetail";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
});


const CheckDetail = () => {

    let { email, paperId } = useParams();

    const getAcademicPaper = async () => {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/check/' + email + '/' + paperId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (response != null) {
            const body = await response.json();
            if (!body.error) {
                console.log(body);
                setSelectedPaper(body)
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
    };

    useEffect(() => {
        getAcademicPaper();
    }, []);

    return (
        <div>
            <PaperDetail />
        </div>
    );
}
export default CheckDetail;
