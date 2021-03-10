import {dispatch, useGlobalState} from "../state";
import {ServerToken} from "../model/ServerToken";
import FetchCurrentUser from "./FetchCurrentUser";
import { Person } from '../model/Person';
import { CurrentUser } from "../model/CurrentUser";



const DoPasswordChange = {
    async doSend(token: ServerToken, newPassword: string, newPasswordConfirm: string, history){

        const response: Response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/auth/changePasswordLoggedIn', {
            method: 'POST',
            body: JSON.stringify({
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm
            }),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
            }
        });
        console.log(response);
        if (response.ok) {
            return true;
        }
        return false;
    }
}
export default DoPasswordChange;