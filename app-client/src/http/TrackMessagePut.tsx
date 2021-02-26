import {dispatch, useGlobalState} from "../state";
import {ServerToken} from "../model/ServerToken";
import FetchCurrentUser from "./FetchCurrentUser";
import { Person } from '../model/Person';
import { CurrentUser } from "../model/CurrentUser";
import { AcademicArticleUpdate } from "../model/AcademicArticleUpdate";
import { AcademicArticle } from "../model/AcademicArticle";
import { Track } from "../model/Track";

const TrackMessagePut = {
    async doSend(token: ServerToken, trackCode: string, newMessage: string) {

        const response: Response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/tracks/' + trackCode + '/message', {
            method: 'PUT',
            body: newMessage,
            headers : {
                // 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
            }
        });
        if (response.ok) {
            const track = await response.json().then(data => data as Track);
            return track;
        }
        return null;
    }
}
export default TrackMessagePut;