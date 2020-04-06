import { dispatch } from "../state";
import {CurrentUser} from "../model/CurrentUser";
import {ServerToken} from "../model/ServerToken";

const setCurrentUser = (currentUser: CurrentUser) => dispatch({
    currentUser: currentUser,
    type: 'setCurrentUser',
});

const FetchCurrentUser = {

    async doFetch(token: ServerToken) {
        console.log(token.accessToken);
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/user/me', {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            }
        });
        if (response != null){
            const body = await response.json();
            if (!body.error){
                console.log(body);
                setCurrentUser(body);
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
        return response;
    }
}
export default FetchCurrentUser;
