import { Container, Grid, Link, Paper, TableCell, Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import { Person } from "../../model/Person";
import { useGlobalState } from "../../state";
import { Author } from "../../pages/public/Author";
import { Slides } from "./Slides";
import { Video } from "./Video";
import Chat from "../chat/Chat";

const PaperDetail = () => {

    const [selectedPaper] = useGlobalState('selectedPaper');

    let affiliationSet = new Set<string>();
    if (selectedPaper != undefined && selectedPaper != null && selectedPaper.authors != undefined){
        selectedPaper.authors.forEach((author: Person) => {
            affiliationSet.add(author.affiliation);
        });
    }

    let affiliations: Array<string> = Array.from(affiliationSet.keys());

    let authorList: string[] = [];
    let affiliationList: number[] = [];
    if (selectedPaper != undefined && selectedPaper != null && selectedPaper.authors != undefined){
        selectedPaper.authors.forEach((author) => {
            authorList.push(author.name);
            affiliationList.push(affiliations.indexOf(author.affiliation) + 1);
        });
    }

    return (
        <>
            <Container maxWidth="xl" component="main" className='paperDetail {classes.heroContent}'>
                <div className="breadcrumbs"><a href={"/#/app"}>ACM SAC 2020</a> >&nbsp;
                <a href={"/#/app/track"}>TRACKS</a> >&nbsp;
                <a href={"/#/app/track/" + selectedPaper.trackCode}>{selectedPaper.trackCode}</a> >&nbsp;
                {selectedPaper.sessionCode}</div>
                <Typography variant="h4" align="center" color="textPrimary" component="h1">
                    {selectedPaper.title}
                </Typography>
                <br />
                {!selectedPaper.hideFromPublic &&
                    <>
                        <Grid container spacing={2} className='slidesVideo'>
                            <Grid item md={6}>
                                <Typography variant="h6" align="center" color="textSecondary" component="p">
                                    Video
                                </Typography>
                                <Paper className="videoBox" style={{ textAlign: "center", padding: "15px", minHeight: "100%"}}>
                                    <Video url={selectedPaper.videoEmbed} />
                                </Paper>
                            </Grid>
                            {selectedPaper && selectedPaper.presentation &&
                            <Grid item md={6} alignContent="center">
                                <Typography variant="h6" align="center" color="textSecondary" component="p">
                                    Slides ({<Link target="_blank" className="exLink" href={selectedPaper && selectedPaper.presentation.download}>author link to PDF - if no preview</Link>})
                                </Typography>
                                <Paper className="paperBox" style={{ textAlign: "center", padding: "15px", minHeight: "100%" }}>
                                    <Slides url={selectedPaper && selectedPaper.presentation.embed} />

                                </Paper>
                            </Grid>
                            }
                        </Grid>
                    </>
                }
                {selectedPaper.hideFromPublic &&
                    <>
                        <Typography variant="h5" align="center" color="textPrimary" component="h1">
                            Author does not wish to open presentation to the public
                        </Typography>
                    </>
                }
                <br />
                <br />
                <br />
                <Container maxWidth="xl" component="main" className="chatContainer">
                    <Grid container spacing={4}>
                        <Grid item md={12}>
                            <Chat/>
                        </Grid>
                    </Grid>
                </Container>
                <Grid container spacing={2} className='authorMeta'>
                    <Grid item md={6}>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            Paper Details
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th">
                                            Title
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            {selectedPaper.title}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            Authors
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            <Typography>
                                                {
                                                    authorList.map((author, ndx) => {
                                                        return (
                                                            <span>
                                                        {author}<sup>{affiliationList[ndx]}</sup>{ndx === authorList.length - 1 ? "" : ", "}
                                                    </span>
                                                        );
                                                    })
                                                }
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            Affiliations
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            <Typography>
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
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            Paper Abstract
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            {selectedPaper.paperAbstract}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            ACM URL
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            <a href={selectedPaper.acmUrl} target="_blank">{selectedPaper.acmUrl}</a>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            DOI
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            <a href={selectedPaper.doiUrl} target="_blank">{!!(selectedPaper.doiUrl)?selectedPaper.doiUrl.substring(16):""}</a>
                                        </TableCell>
                                    </TableRow>
                                    {!!(selectedPaper.pageNumbers) && (
                                        <TableRow>
                                            <TableCell component="th">
                                                Page Numbers
                                            </TableCell>
                                            <TableCell align="left" scope="row">
                                                {selectedPaper.pageNumbers}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!!(selectedPaper.acknowledgements) && (
                                        <TableRow>
                                            <TableCell component="th">
                                                Acknowledgements
                                            </TableCell>
                                            <TableCell align="left" scope="row">
                                                {selectedPaper.acknowledgements}
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            Presenter Details
                        </Typography>
                        <Author author={selectedPaper.presenter} />
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}
export default PaperDetail;
