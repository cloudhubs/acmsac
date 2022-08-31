import React, {FunctionComponent} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Track} from "../../model/Track";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useGlobalState} from "../../state";
import {
    ButtonBase,
    Container, IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    Grid,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import { BrowserRouter as Router, useHistory, useParams } from "react-router-dom";
import TransitionsModal from "../../shared/TransitionModal";
import {Video} from "../paperDetail/Video";



const TrackTable = () => {
    const [tracks] = useGlobalState('tracks');
    // console.log(tracks);
    let history = useHistory();
    const [open, setOpen] = React.useState(false);


    const goDetail = (event: React.MouseEvent<HTMLElement>, row: Track) => {
        event.preventDefault();
        history.push("/app/track/" + row.code);
    }

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
            subHeroContent2: {
                padding: theme.spacing(20, 0, 3),
            },
        }),
    );
    const classes = useStyles();

    return (
        <div>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>


                <Typography variant="h4" align="right" color="textSecondary" component="p" className={classes.subHeroContent}>
                    <TransitionsModal givenOpen={open}/>
                </Typography>

                <div>

                    <Typography variant="h4" align="center" color="textSecondary" component="p">
                        Keynote
                    </Typography>

                    <Typography variant="h6" align="center" color="textSecondary" component="p">
                        Spatiotemporal Event Forecasting in Social Media.
                        <br/>
                        <b>Speaker:</b> Prof. Chang-Tien Lu
                    </Typography>

                    <br/>

                    <div  style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}>
                        <Video url={"<iframe width='460' height='215' src='https://www.youtube.com/embed/4lDRwMNTrhE' frameBorder='0'\n" +
                        "                                allowFullScreen></iframe>"} />
                    </div>

                    {/*<Paper className='videoBox {classes.subHeroContent}' style={{ textAlign: "center", padding: "35px", minHeight: "100%"}}>*/}

                    {/*    */}
                    {/*</Paper>*/}
                </div>

                <div>

                    <Typography variant="h4" align="center"  color="textSecondary" component="p" className={classes.subHeroContent}>
                        Tracks
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell >Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tracks.map(row => (

                                    <TableRow key={row.id} hover role="checkbox" className={classes.rowClick} onClick={(event) => {goDetail(event, row)}}>
                                        <TableCell>{row.code}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <ButtonBase>
                                            <TableCell>
                                                <IconButton onClick={(event) => {goDetail(event, row)}}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        </ButtonBase>
                                    </TableRow>


                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>


            </Container>



        </div>
    );
}
export default TrackTable;
