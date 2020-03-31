import { AcademicArticle } from "../model/AcademicArticle";
import { dispatch, useGlobalState } from "../state";
import {ServerResponse} from "http";
import {ServerMessage} from "../model/ServerMessage";

const setReminderMessage = (serverMessage: ServerMessage) => dispatch({
    reminderMessage: serverMessage,
    type: 'setReminderMessage',
});

const DoPasswordReminder = {

    async doSend(email) {
        const response = await fetch('https://acmsac.ecs.baylor.edu/api/auth/resetPassword/' + email, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (response != null){
            const body = await response.json();
            console.log(body);
            if (!body.error) {
                setReminderMessage(body)
            } else {
                setReminderMessage({success: false, message: body.message});
            }
        } else {
            setReminderMessage({success: false, message: "Server error"});
        }
    }
}
export default DoPasswordReminder;
