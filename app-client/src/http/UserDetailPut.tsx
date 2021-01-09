import {dispatch, useGlobalState} from "../state";
import {ServerToken} from "../model/ServerToken";
import FetchCurrentUser from "./FetchCurrentUser";
import { Person } from '../model/Person';

const UserDetailPUT = {
    async doSend(token: ServerToken, person: Person){

        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/user/me', {
            method: 'PUT',
                        body: JSON.stringify(person),
                        headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token.accessToken}`,
                        }
                    });
        if (response != null){
                    const body = await response.json();

                    if (!body.error){
//                         await FetchCurrentUser.doFetch(body);
                    } else {
                        console.log(body.message);
                    }
                } else {
                    console.log("server error");
                }
                return response;
        }
    }
export default UserDetailPUT;