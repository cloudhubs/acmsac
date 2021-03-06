import React, {useEffect} from "react";
import {useGlobalState} from "../../../state";
import {Typography} from "@material-ui/core";
import SchedulePane from "../../../components/session/MainSchedulePane";

// TODO finalize name with Dr. Cerny, Vincent
const SessionsView = () => {
    console.log("full schedule view / roster");
    const [serverError] = useGlobalState('serverError');

    return (
        <>
            { serverError.success? <SchedulePane/> : <Typography variant="body1">{serverError.message}</Typography> }
        </>
    );
}
export default SessionsView;
