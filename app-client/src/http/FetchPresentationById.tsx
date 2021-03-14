import { useHistory, useParams } from "react-router-dom";
import { AcademicArticle, mapArticleBackendToFrontend } from "../model/AcademicArticle";
import { dispatch } from "../state";
import { ServerToken } from "../model/ServerToken";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: mapArticleBackendToFrontend(selectedPaper),
    type: 'setSelectedPaper',
});

const FetchPresentationById = {

    async getById(token: ServerToken, id) {

        const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/presentations/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
        });
        if (response != null) {
            const body = await response.json();
            if (!body.error) {
                // console.log(body);
                setSelectedPaper(body)
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
    }
}
export default FetchPresentationById;
