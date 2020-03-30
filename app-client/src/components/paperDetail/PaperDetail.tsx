import { Container, Grid, Link, Paper, TableCell, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AcademicArticle } from "../../model/AcademicArticle";
import { Person } from "../../model/Person";
import { dispatch, useGlobalState } from "../../state";
import { Author } from "../../pages/public/Author";
import { Slides } from "./Slides";
import { Video } from "./Video";
import Chat from "../chat/Chat";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
});


const PaperDetail = () => {

    let { email, paperId } = useParams();

    // const getAcademicPaper = async () => {
    //     const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/check/' + email + '/' + paperId, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         }
    //     });
    //     if (response != null) {
    //         const body = await response.json();
    //         if (!body.error) {
    //             console.log(body);
    //             setSelectedPaper(body)
    //         } else {
    //             console.log(body.message);
    //         }
    //     } else {
    //         console.log("server error");
    //     }
    // };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            heroContent: {
                padding: theme.spacing(2, 0, 1),
                margin: '3em'
            }
        }),
    );

    //
    // useEffect(() => {
    //     getAcademicPaper();
    // }, []);

    const classes = useStyles();

    const [selectedPaper] = useGlobalState('selectedPaper');

    let affiliationSet = new Set<string>();
    selectedPaper.authors.forEach((author: Person) => {
        affiliationSet.add(author.affiliation);
    });
    let affiliations: Array<string> = Array.from(affiliationSet.keys());

    let authorList: string[] = [];
    let affiliationList: number[] = [];
    selectedPaper.authors.forEach((author) => {
        authorList.push(author.name);
        affiliationList.push(affiliations.indexOf(author.affiliation) + 1);
    });

    return (
        <>

            <Container maxWidth="xl" component="main" className='paperDetail {classes.heroContent}'>

                <Typography variant="h4" align="center" color="textPrimary" component="h1">
                    {selectedPaper.title}
                </Typography>

                <br />

                <Grid container spacing={2} className='slidesVideo'>
                    <Grid item md={6}>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            Video
                    </Typography>
                        <Paper style={{ textAlign: "center", padding: "15px", minHeight: "100%", paddingTop: "15%" }}>
                            <Video url={selectedPaper.videoEmbed} />
                        </Paper>
                    </Grid>
                    {selectedPaper && selectedPaper.presentation &&
                        <Grid item md={6} alignContent="center">
                            <Typography variant="h6" align="center" color="textSecondary" component="p">
                                Slides ({<Link target="_blank" href={selectedPaper && selectedPaper.presentation.download}>External Link</Link>})
                    </Typography>
                            <Paper style={{ textAlign: "center", padding: "15px", minHeight: "100%" }}>
                                <Slides url={selectedPaper && selectedPaper.presentation.embed} />

                            </Paper>
                        </Grid>
                    }

                </Grid>

                <br />
                <br />
                <br />

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
                                                            <div>
                                                                {
                                                                (ndx + 1)+ " - " + affiliation
                                                                }
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
                                            Page Numbers
                                </TableCell>
                                        <TableCell align="left" scope="row">
                                            {selectedPaper.pageNumbers}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            Acknowledgements
                                </TableCell>
                                        <TableCell align="left" scope="row">
                                            {selectedPaper.acknowledgements}
                                        </TableCell>
                                    </TableRow>


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
