import * as React from 'react';
import { Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {TextField} from "@material-ui/core";
import {Reply} from "../../model/Reply";
import {useState} from "react";
import {useGlobalState} from "../../state";
import {Comment} from "../../model/Comment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        summary: {
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
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

const ChatRow = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [replyText, setReply] = useState("");
    const [token] = useGlobalState('serverToken');
    const classes = useStyles();

    const submitReply = async () => {
        // Send off request and on return, print success - simulated below
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/chat/reply/' + props.data.id, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                date: null,
                user: null,
                content: replyText,
                blocked: false
            })
        });

        if (response != null){
            const body = await response.json();
            console.log(body);

            if (!body.error) {
                // TODO - We probably need to refresh the page, idk how to do that
            } else {
                console.log(body.message);
            }
        } else {
            console.log("Server error");
        }

        setExpanded(true);
    };

    return (
        <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    <b>{props.data.user.name}</b> <br/>
                    {props.data.content}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container={true}>
                    {props.data.replies.length > 0 ?
                        props.data.replies.map((reply: Reply) => {
                            return (
                                <>
                                    <Grid item xs={1} />
                                    <Grid item={true} xs={11}>
                                        <Typography>
                                            <b>{reply.user.name}</b> <br/>
                                            {reply.content}
                                        </Typography>
                                        <Divider/>
                                    </Grid>
                                </>
                            );
                        })
                    :
                       <Typography>
                           No replies yet
                       </Typography>
                    }
                </Grid>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Grid container>
                    <Grid item xs={11} >
                        <TextField
                            style={{minWidth: '100%'}}
                            label={"Reply"}
                            placeholder={"Reply"}
                            value={replyText}
                            onChange={(event) => setReply(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={1} >
                        <Button style={{marginTop: "10px"}} size="small" color="primary" onClick={submitReply}>
                            Reply
                        </Button>
                    </Grid>
                </Grid>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

export default ChatRow;