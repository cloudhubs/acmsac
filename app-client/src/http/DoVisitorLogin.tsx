import { dispatch } from "../state";
import {ServerToken} from "../model/ServerToken";
import {SignInUser} from "../model/SignInUser";

const setServerToken = (serverToken: ServerToken) => dispatch({
    serverToken: serverToken,
    type: 'setServerToken',
});

const setAuthenticated = () => dispatch({
    type: 'setAuthenticated',
});

const DoVisitorLogin = {

    async doSend(history) {
        let signInUser = new SignInUser();
        signInUser.usernameOrEmail = "visitor@acmsac.org";
        signInUser.password = "caey88";
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/auth/signin', {
            method: 'POST',
            body: JSON.stringify(signInUser),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response != null){
            const body = await response.json();

            if (!body.error){
                setServerToken(body);
                setAuthenticated();
                setTimeout(function(){ }, 1000);
                history.push("/app/track");
                console.log(body);
            } else {
                console.log(body.message);
            }
        } else {
            console.log("server error");
        }
        return response;
    }
}
export default DoVisitorLogin;
