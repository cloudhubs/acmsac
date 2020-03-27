import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const VideoFrame = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            
        }),
    );

    const classes = useStyles();

    return (
        <>
            <p>VideoFrame</p>
        </>
    );
}
export default VideoFrame;