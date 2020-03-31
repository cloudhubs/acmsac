import React, {FunctionComponent} from "react";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Track} from "../../model/Track";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useGlobalState} from "../../state";
import {
    Box,
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
import {Person} from "../../model/Person";


const PaperTable = () => {
    const [academicPapers] = useGlobalState('academicPapers');
    console.log(academicPapers);
    let history = useHistory();
    let {code} = useParams();
    const [trackDetail] = useGlobalState('trackDetail');

    const goDetail = (event: React.MouseEvent<HTMLElement>, row: AcademicArticle) => {
        event.preventDefault();
        history.push("/beta/track/" + code + "/" + row.id);
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
            boxContent: {
                padding: theme.spacing(2),
            }
        }),
    );
    const classes = useStyles();

    console.log(trackDetail.chairs);

    let affiliationSet = new Set<string>();
    trackDetail.chairs.forEach((chair: Person) => {
        affiliationSet.add(chair.affiliation);
    });
    let affiliations: Array<string> = Array.from(affiliationSet.keys());

    let chairList: string[] = [];
    let affiliationList: number[] = [];
    trackDetail.chairs.forEach((chair) => {
        chairList.push(chair.name);
        affiliationList.push(affiliations.indexOf(chair.affiliation) + 1);
    });

    return (
        <div>

            <div className="breadcrumbs"><a href={"/#/beta"}>ACM SAC 2020</a> >&nbsp;
                <a href={"/#/beta/track"}>TRACKS</a> >&nbsp;
                {code}</div>

            <Container maxWidth="lg" component="main" className="trackDetail">
                >
                <h1>{trackDetail.name} </h1>
                {trackDetail.code} (<a href={trackDetail.trackUrl}>web</a>) has {academicPapers.length} papers available

                <Paper className="xvideoBox" style={{textAlign: "center", marginTop: "0px", minHeight: "100%"}}>
                    <Video url={trackDetail.videoEmbed}/>
                </Paper>


                            <div>
                                            Chairs:{/*trackDetail.chairs*/}
                                
                                            {/*
                                                trackDetail.chairs.map((chair, ndx) => {
                                                    return (
                                                        <span>
                                                            {chair}<sup>{affiliationList[ndx]}</sup>{ndx === chairList.length - 1 ? "" : ", "}
                                                        </span>
                                                    );
                                                })
                                            */}
                            </div>
                            <div>               
                                            Affiliations:
                                
                                                
                    </div>
                <h4>{'Track chair message'}</h4>
                {trackDetail.message}

Chairs:
                    {trackDetail && trackDetail.chairs && trackDetail.chairs.map((chair: Person) => (
                        <div>
                                <p>{chair.name}</p>
                                <p>{chair.email}</p>
                        </div>
                    ))}

                <div>
                    Chairs:{/*trackDetail.chairs*/}
                    {
                        trackDetail.chairs.map((chair, ndx) => {
                            return (
                                <span>
                                                {chair.name}<sup>{affiliationList[ndx]}</sup>{ndx === chairList.length - 1 ? "" : ", "}
                                            </span>
                            );
                        })
                    }
                </div>
                <div>
                    Affiliations:

                    {
                        affiliations.map((affiliation, ndx) => {
                            return (
                                <div><sup>
                                    {
                                        (ndx + 1) +"  "
                                    }</sup>{affiliation}
                                    <br />
                                </div>
                            );
                        })
                    }


                </div>
            </Container>


            <Container maxWidth="lg" component="main" className="trackContainer">



                <Typography color="textSecondary" component="p" className="trackPanel">
                    <Box boxShadow={3}>
                        <Paper className={classes.boxContent}>
                            <h4>{'Track chair message'}</h4>
                            {trackDetail.message}
                            {/*trackDetail.ack*/}
                        </Paper>
                    </Box>
                </Typography>
                <h2>Full-papers</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Session</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Presenter</TableCell>
                                {/**<TableCell align="right">Abstract</TableCell>*/}
                                <TableCell>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {academicPapers.filter(row => row.type != 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode.localeCompare(b.sessionCode);
                            }).map((row: AcademicArticle) => (
                                <TableRow key={row.id} hover role="checkbox" className={classes.rowClick}
                                          onClick={(event) => {
                                              goDetail(event, row)
                                          }}>
                                    <TableCell align="left">{row.sessionCode}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell align="right">{row.presenter.name}</TableCell>
                                    {/**
                                     <TableCell align="left">
                                     <a className="hoverMe">Show abstract..</a>
                                     <div className="hideAbstract">
                                     {row.paperAbstract}
                                     </div>
                                     </TableCell>
                                     */}
                                    <TableCell>
                                        <ButtonBase>
                                            <IconButton onClick={(event) => {
                                                goDetail(event, row)
                                            }}>
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </ButtonBase>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Posters</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Presenter</TableCell>
                                {/**<TableCell align="right">Abstract</TableCell>*/}
                                <TableCell>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {academicPapers.filter(row => row.type == 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode.localeCompare(b.sessionCode);
                            }).map((row: AcademicArticle) => (
                                <TableRow key={row.id} hover role="checkbox" className={classes.rowClick}
                                          onClick={(event) => {
                                              goDetail(event, row)
                                          }}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell align="right">{row.presenter.name}</TableCell>
                                    {/**
                                     <TableCell align="left">
                                     <a className="hoverMe">Show abstract..</a>
                                     <div className="hideAbstract">
                                     {row.paperAbstract}
                                     </div>
                                     </TableCell>
                                     */}
                                    <TableCell>
                                        <ButtonBase>
                                            <IconButton onClick={(event) => {
                                                goDetail(event, row)
                                            }}>
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </ButtonBase>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>


        </div>
    );
}
export default PaperTable;
