import React, {FunctionComponent} from "react";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Track} from "../../model/Track";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useGlobalState} from "../../state";
import {
    Box,
    Button,
    ButtonBase,
    Container, IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import {BrowserRouter as Router, useHistory, useParams} from "react-router-dom";
import {AcademicArticle} from "../../model/AcademicArticle";
import {Video} from "./Video";
import EmailIcon from '@material-ui/icons/Email';
import {Person} from "../../model/Person";
import Avatar from "@material-ui/core/Avatar";
import PaperList from "../currentUser/PaperList";
import { TextField } from "@material-ui/core";
import TrackMessagePut from "../../http/TrackMessagePut";
import FetchTrackByCode from "../../http/FetchTrackByCode";
import { useEffect } from "react";


const PaperTable = () => {
    const [academicPapers] = useGlobalState('academicPapers');
    const [currentUser] = useGlobalState('currentUser');
    const [isEditMode, setEditMode] = React.useState<boolean>(false);
    const [token] = useGlobalState('serverToken');
    const [trackDetail, setTrackDetail] = useGlobalState('trackDetail');
    const [newMessage, setNewMessage] = React.useState<string>("");

    let history = useHistory();
    let {code} = useParams();
    let isEditable: boolean = currentUser.roles.includes("ROLE_ADMIN") ||
        (trackDetail.chairs && trackDetail.chairs.filter(chair => chair.email === currentUser.email).length > 0);

    const saveMessage = async () => {
        const newTrack = await TrackMessagePut.doSend(token, trackDetail.code, trackDetail.message);
        if (newTrack === null) {
            console.log("WE FAILED");
        }
        FetchTrackByCode.getTrackByCode(token, trackDetail.code);
        setEditMode(false);
    }

    const goDetail = (event: React.MouseEvent<HTMLElement>, row: AcademicArticle) => {
        event.preventDefault();
        history.push("/app/track/" + code + "/" + row.id);
    }

    useEffect(() => {
        setNewMessage(trackDetail.message);
    }, []);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            autoSizeInput: {
                margin: '2px'
            },
            boxik: {
                padding: '10px'
            },
            heroContent: {
                padding: theme.spacing(8, 0, 6),
            },
            rowClick: {
                //cursor: 'pointer'
            },
            subHeroContent: {
                padding: theme.spacing(4, 0, 3),
            },
            boxContent: {
                padding: theme.spacing(2),
            }
        }),
    );
    const classes = useStyles();

    return (
        <div>

            <div className="breadcrumbs"><a href={"/app"}>ACM SAC 2021</a> &nbsp;
                <a href={"/app/track"}>TRACKS</a> &nbsp;
                {code}</div>

            <Container maxWidth="lg" component="main" className="trackDetail">
                <br/><br/>
                <h1>{trackDetail.name} </h1>
                {trackDetail.code} (<a href={trackDetail.trackUrl}>web</a>) has {academicPapers.length} papers available
<br/><br/>
                <Paper className="xvideoBox" style={{textAlign: "center", marginTop: "0px", minHeight: "100%"}}>
                    <Video url={trackDetail.videoEmbed}/>
                </Paper>



                Chairs:
                    {trackDetail && trackDetail.chairs && trackDetail.chairs.map((chair: Person) => (
                        <div className="chairLine">
                            <p>
                            <Avatar style={{height: "45px", maxWidth: "45px", width: "100px"}} className="chairPic" src={chair.picUrl} />
                            
                            {chair.name}
                            <Link className={"user-"} href={"mailto:" + chair.email}><EmailIcon style={{paddingTop: '5px'}} /></Link>
                            <span className="space">{chair.affiliation}</span>
                            <span className="space">{chair.country}</span>
                            {!!(chair.orcid) && (
                                <Link className="link space" href={chair.orcid}>ORCID</Link>
                            )}
                            {!!(chair.linkedInUrl) && (
                                <Link className="link space"  href={chair.linkedInUrl}>LinkedIn</Link>
                            )}
                            {!!(chair.googleScholarUrl) && (
                                <Link className="link space" href={chair.googleScholarUrl}>Google Scholar</Link>
                            )}
                            {!!(chair.bio) && (
                                <span className="space">
                                    <a className="hoverMe">Bio</a>
                                    <div className="hideAbstract">{chair.bio}</div>
                                </span>
                            )}
                                
                            </p>
                        </div>
                    ))}


            </Container>


            <Container maxWidth="lg" component="main" className="trackContainer">


            {!!(trackDetail.message) && !isEditMode && ( 
                <Box boxShadow={3}>
                    <Paper className={classes.boxContent}>
                        <Typography color="textPrimary" component="span" className="trackPanel">
                            <b>{'Track chair message'}</b><br/>{trackDetail.message}
                        </Typography>
                        {!!(trackDetail.acknowledgement) && (
                        <div>
                        <b>{'Acknowledgements'}</b><br/>
                        {trackDetail.acknowledgement}
                        </div>
                        )}
                    </Paper>
                </Box>
            )}
            {isEditMode && <TextField
                fullWidth
                label="Track Message"
                value = {trackDetail.message}
                onChange={(event) => {
                    const message = event.target.value;
                    trackDetail.message = message;
                    setTrackDetail((t) => ({...t,message}));
                }}
            />}
            <br/>
            {isEditable &&
                (isEditMode ? 
                    <Button color="primary" variant="outlined" onClick={saveMessage}>Save Message</Button> :
                    <Button color="primary" variant="outlined" onClick={()=>setEditMode(true)}>Edit Message</Button>
                )
            }
                <h2>Full papers</h2>
                <PaperList papers={academicPapers.filter(row => row.type.toLowerCase().indexOf('poster') < 0).slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode == null ? -1 : a.sessionCode.localeCompare(b.sessionCode);
                            })}></PaperList>
                <h2>Posters</h2>
                <PaperList papers={academicPapers.filter(row => row.type.toLowerCase().indexOf('poster') >= 0).slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode == null ? -1 : a.sessionCode.localeCompare(b.sessionCode);
                            })}></PaperList>
            </Container>


        </div>
    );
}
export default PaperTable;
