import { useHistory, useParams } from "react-router-dom";
import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch, useGlobalState } from "../state";
import { ServerToken } from "../model/ServerToken";
import {Track} from "../model/Track";

const setTrackDetail = (trackDetail: Track) => dispatch({
    trackDetail: trackDetail,
    type: 'setTrackDetail',
});

const FetchTrackByCode = {

    async getTrackByCode(history, token: ServerToken, code: string) {

        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/tracks/' + code  , {

            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
        });
        if (response != null){
            const body = await response.json();
            console.log(body);
            if (!body.error) {
                setTrackDetail(body)
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
    }
}
export default FetchTrackByCode;
