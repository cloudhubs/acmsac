import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import FetchPresentationsBySession from "../../http/FetchPresentationsBySession";
import { Session } from "../../model/Session";
import { useGlobalState } from "../../state";

function PresentationList() {
    let [presentations] = useGlobalState("presentations");
    let [session] = useGlobalState("selectedSession");
    const [token] = useGlobalState("serverToken");

    useEffect(() => {
        console.log(JSON.stringify(session))
        if (session.sessionCode !== "") {
            FetchPresentationsBySession.getPresentations(token, session);
        }
    }, [session]);

    if (presentations.length === 0)
        return <Typography variant="body1">NONE FOUND</Typography>;

    return (<>
        {presentations.map((p) => JSON.stringify(p))}
    </>);
  };
  
  export default PresentationList;