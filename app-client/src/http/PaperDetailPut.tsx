import {dispatch, useGlobalState} from "../state";
import {ServerToken} from "../model/ServerToken";
import FetchCurrentUser from "./FetchCurrentUser";
import { Person } from '../model/Person';
import { CurrentUser } from "../model/CurrentUser";
import { AcademicArticleUpdate } from "../model/AcademicArticleUpdate";
import { AcademicArticle } from "../model/AcademicArticle";

const PaperDetailPut = {
    async doSend(token: ServerToken, id: number, paperUpdate: AcademicArticleUpdate){

        const response: Response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/presentations/' + id, {
            method: 'PUT',
            body: JSON.stringify(paperUpdate),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
            }
        });
        if (response.ok) {
            const user = await response.json().then(data => data as AcademicArticle);
            return user;
        }
        return null;
//         if (response != null){
//             const body = await response.json();

//             if (!body.error){
// //                         await FetchCurrentUser.doFetch(body);
//             } else {
//                 console.log(body.message);
//             }
//         } else {
//             console.log("server error");
//         }
//         return response;
    }
}
export default PaperDetailPut;