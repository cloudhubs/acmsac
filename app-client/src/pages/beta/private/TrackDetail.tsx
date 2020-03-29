import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter as Router, useHistory, useParams } from "react-router-dom";


const TrackDetail = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            autoSizeInput: {
                margin: '2px'
            },
            boxik: {
                padding: '10px'
            }
        }),
    );
    const classes = useStyles();
    let {code} = useParams();

    return (
        <div>
            Track Detail
        </div>
    );
}
export default TrackDetail;
