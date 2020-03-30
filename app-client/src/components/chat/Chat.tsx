import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ChatRow from "./ChatRow";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {dispatch, useGlobalState} from "../../state";
import {useState} from "react";
import { Comment } from "../../model/Comment";
import {AcademicArticle} from "../../model/AcademicArticle";

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

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
});

const Chat = () => {

    const [commentText, setComment] = useState("");
    const [selectedPaper] = useGlobalState('selectedPaper');
    const [token] = useGlobalState('serverToken');
    const classes = useStyles();

    const onSubmit = async () =>{
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/chat/presentation/' + selectedPaper.id, {
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
                // TODO - We probably need to refresh the page, idk how to do that
                selectedPaper.comments.push(body);
                setSelectedPaper(selectedPaper);
                //console.log(body);
                setComment("");
            } else {
                console.log(body.message);
            }
        } else {
            console.log("Server error");
        }
    };

    return (
        <Paper className={classes.paper} elevation={3}>
            <h3>Chat</h3>

            {selectedPaper.comments.length > 0 ?
                selectedPaper.comments.map((comment: Comment) => {
                    return (<ChatRow commentId={comment.id} data={comment}/>);
                })
            :
                <Typography className={classes.secondaryHeading}>
                    No comments yet
                </Typography>
            }

            <br/>

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

        </Paper>

    );
};

export default Chat;
