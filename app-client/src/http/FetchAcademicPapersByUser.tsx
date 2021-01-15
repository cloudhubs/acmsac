import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch } from "../state";
import { ServerToken } from "../model/ServerToken";

const FetchAcademicPapersByUser = {

    async getAcademicPapersByUser(token: ServerToken, userid: number) {

        const url = process.env.REACT_APP_API_BASE_URL +  '/presentations/user/' + userid;
        const response = await fetch(url , {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
        });
        if (response != null){
            const body = await response.json();
            if (!body.error) {
                return body;
            } else {
                console.log(body.message);
                return [];
            }
        } else {
            console.log("server error");
            return [];
        }
    }
}
export default FetchAcademicPapersByUser;
