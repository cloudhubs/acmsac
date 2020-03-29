import { useHistory, useParams } from "react-router-dom";
import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch, useGlobalState } from "../state";
import { ServerToken } from "../model/ServerToken";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
});

const FetchPresentationById = {

    async getById(token: ServerToken, id) {

        // let url = "";
        // if (track === "all"){
        //     url = process.env.REACT_APP_API_BASE_URL +  '/presentations'
        // } else {
        //     url = process.env.REACT_APP_API_BASE_URL +  '/presentations/bytrack/' + track
        // }
        // const response = await fetch(url , {
        //
        //     method: 'GET',
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${token.accessToken}`
        //     }
        // });
        // console.log(response);
        // if (response != null){
        //     const body = await response.json();
        //     console.log(body);
        //     if (!body.error) {
        //         setAuthorsPapers(body)
        //     } else {
        //         console.log(body.message);
        //     }
        // } else {
        //     console.log("server error");
        // }
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
                console.log(body);
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
