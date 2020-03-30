import { Container, Grid, Link, TableCell } from "@material-ui/core";
import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import TrackChatRow from "./TrackChatRow";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {dispatch, useGlobalState} from "../../state";
import {useState} from "react";
import { Comment } from "../../model/Comment";
import {AcademicArticle} from "../../model/AcademicArticle";
import {Track} from "../../model/Track";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'left' as 'left',
            color: theme.palette.text.secondary
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            height: '100%',
            verticalAlign: 'middle',
            flexBasis: '33.33%',
            flexShrink: 0,
            color: theme.palette.text.secondary,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
        },
    }),
);

const setTrackDetail = (trackDetail: Track) => dispatch({
    trackDetail: trackDetail,
    type: 'setTrackDetail',
});

const TrackChat = () => {

    const [commentText, setComment] = useState("");
    const [trackDetail] = useGlobalState('trackDetail');
    const [token] = useGlobalState('serverToken');
    const classes = useStyles();

    const onSubmit = async () =>{
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/chat/track/' + trackDetail.id, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
            },
            body: JSON.stringify({
                date: null,
                user: null,
                replies: [],
                content: commentText,
                blocked: false
            })
        });

        if (response != null){
            const body = await response.json();

            if (!body.error) {
                trackDetail.comments.push(body);
                setTrackDetail(trackDetail);
                setComment("");
            } else {
                console.log(body.message);
            }
        } else {
            console.log("Server error");
        }
    };

    return (
        <>
            <Typography variant="h6" align="center" color="textSecondary" className="chatHeader" component="p">
                Chat
            </Typography>
            <Paper className={classes.paper} elevation={3}>
                {trackDetail && trackDetail.comments.length > 0 ?
                    trackDetail.comments.map((comment: Comment) => {
                        return (<TrackChatRow commentId={comment.id} data={comment}/>);
                    })
                :
                    <Typography className={classes.secondaryHeading}>
                        No comments yet
                    </Typography>
                }

                <br/>
                <Grid className="chatPostNew">
                    <form>
                        <TextField
                            placeholder={"Comment"}
                            value={commentText}
                            onChange={(event) => setComment(event.target.value)}
                            style={{minWidth: '75%'}}
                        />

                        <Button size="small" color="primary" style={{marginLeft: '15px'}} onClick={onSubmit}>
                            Submit
                        </Button>
                    </form>
                </Grid>

            </Paper>
        </>

    );
};

export default TrackChat;
