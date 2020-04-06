import {dispatch, useGlobalState} from "../state";
import {ServerToken} from "../model/ServerToken";
import {SignInUser} from "../model/SignInUser";
import FetchCurrentUser from "./FetchCurrentUser";

const setServerToken = (serverToken: ServerToken) => dispatch({
    serverToken: serverToken,
    type: 'setServerToken',
});

const setAuthenticated = () => dispatch({
    type: 'setAuthenticated',
});

const DoLogin = {

    async doSend(history, signInUser) {



        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/auth/signin', {
            method: 'POST',
            body: JSON.stringify(signInUser),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (response != null){
            const body = await response.json();

            if (!body.error){
                setServerToken(body);
                setAuthenticated();
                setTimeout(function(){ }, 1000);
                console.log(body.accessToken);
                await FetchCurrentUser.doFetch(body);
                history.push("/app/track");
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
        return response;
    }
}
export default DoLogin;
