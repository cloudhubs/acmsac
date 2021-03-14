import * as React from 'react';
import { Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {TextField} from "@material-ui/core";
import {Reply} from "../../model/Reply";
import {useState} from "react";
import {dispatch, useGlobalState} from "../../state";
import {AcademicArticle} from "../../model/AcademicArticle";
import {Track} from "../../model/Track";
import Link from "@material-ui/core/Link";
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import FetchTrackByCode from "../../http/FetchTrackByCode";

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

const setTrackDetail = (trackDetail: Track) => dispatch({
    trackDetail: trackDetail,
    type: 'setTrackDetail',
});

const ChatRow = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [replyText, setReply] = useState("");
    const [trackDetail] = useGlobalState('trackDetail');
    const [token] = useGlobalState('serverToken');
    const classes = useStyles();

    const submitReply = async () => {
        // Send off request and on return, print success - simulated below
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/chat/reply/' + props.data.id, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`
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
            // console.log(trackDetail);
            // console.log(body);

            if (!body.error) {
                for(let i = 0; i < trackDetail.comments.length; i++){
                    if(trackDetail.comments[i].id == props.data.id){
                        //console.log(body);
                        //trackDetail.comments[i].replies.push(body);
                        //setTrackDetail(trackDetail);
                        //console.log(trackDetail);
                        await FetchTrackByCode.getTrackByCode(token, trackDetail.code);
                        setReply("");
                    }
                }
            } else {
                console.log(body.message);
            }
        } else {
            console.log("Server error");
        }

        setExpanded(true);
    };

    return (
        <Accordion className='chatRow'  expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                <Typography className="header">
                    <span className="img" >
                        
                    <Avatar className="img" style={{height: "60px", maxWidth: "60px", width: "60px"}} src={props.data.user.picUrl} />
                    <span className="replies">{props.data.replies.length} {props.data.replies.length==1?'reply':'replies'}</span> 
                    </span>
                    <b className={"message-"+props.data.id+" user-"+props.data.user.id}>{props.data.user.name}</b> <Link href={"mailto:" + props.data.user.email}><EmailIcon style={{paddingTop: '5px'}} /></Link> <Link href={"https://acmsac.ecs.baylor.edu/api/check/" + props.data.user.email}><SearchIcon style={{paddingTop: '5px'}} /></Link><br/>
                    {props.data.content}
                    <span className="time">{props.data.date.substr(5,5)} at {props.data.date.substr(11,5)}</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails className='chatRowDetails'>
                <Grid container={true}>
                    {props.data.replies.length > 0 ?
                        props.data.replies.map((reply: Reply) => {
                            return (
                                <>
                                    <Grid item className='chatReply' style={{marginLeft: "30px"}} xs={12}>
                                        <Typography>
                                            <span className="img" >
                        
                                            <Avatar className="img" style={{height: "60px", maxWidth: "60px", width: "60px"}} src={reply.user.picUrl} />
                                            </span>
                                            <b className={"reply-"+reply.id +" user-"+props.data.user.id}>{reply.user.name}</b> <Link href={"mailto:" + reply.user.email}><EmailIcon style={{paddingTop: '5px'}} /></Link> <Link href={"https://acmsac.ecs.baylor.edu/api/check/" + reply.user.email}><SearchIcon style={{paddingTop: '5px'}} /></Link><br/>
                                            {reply.content}
                                            <span className="time">{reply.date.substr(5,5)} at {reply.date.substr(11,5)}</span>
                                        </Typography>
                                        <Divider/>
                                    </Grid>
                                </>
                            );
                        })
                    :
                       <Typography className='chatReply'>
                           No replies yet
                       </Typography>
                    }
                </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions className='chatActions'>
                <Grid container className='chatNew'>
                    <Grid item xs={11} >
                        <TextField className='chatInput'
                            style={{minWidth: '95%'}}
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
            </AccordionActions>
        </Accordion>
    );
};

export default ChatRow;
