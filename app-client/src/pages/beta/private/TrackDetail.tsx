import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
    return (
        <div>
            Track Detail
        </div>
    );
}
export default TrackDetail;
