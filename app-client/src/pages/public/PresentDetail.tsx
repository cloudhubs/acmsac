import React, { useEffect } from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Paper, Typography, TableCell, Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { AcademicArticle } from "../../model/AcademicArticle";
import { dispatch, useGlobalState } from "../../state";
import { Author } from "./Author";
import { Video } from "./Video";
import { Slides } from "./Slides";

const setSelectedPaper = (selectedPaper: AcademicArticle) => dispatch({
    selectedPaper: selectedPaper,
    type: 'setSelectedPaper',
  });


const PresentDetail = () => {

    let { email, paperId } = useParams();

    const getAcademicPaper = async () => {

        let token: string = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg1MzAxMDAyLCJleHAiOjE1ODU5MDU4MDJ9.mjgyoExoVU5UwKneeUctDGjwEviErcZxmPUeQQew1KIX0ZDHI7fv4a36xoxgZq-iMcuN8F-Gxfllmx__y8sxCg";
    
        const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/check/' + email + '/' + paperId, {            

            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Authorization': `Bearer ${token}`
            }
            });
            if (response != null){
                const body = await response.json();
                console.log(body);
                if (!body.error) {
                    setSelectedPaper(body)
                    
                } else {
                  console.log(body.message);
                }
            } else {
              console.log("server error");
            }
    };

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

    useEffect(() => {
        getAcademicPaper();
    }, []);

    const classes = useStyles();

    const [selectedPaper] = useGlobalState('selectedPaper');

    return (
        <>

            <Container maxWidth="xl" component="main" className={classes.heroContent}>
                
            <Grid container spacing={2}>
                
                <Grid item md={6}>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Paper Detail
                    </Typography>
                <Box m={2}>
                
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
                                    Paper ID
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {selectedPaper.paperId}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                    Track Code
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {selectedPaper.trackCode}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                    Session Code
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {selectedPaper.sessionChair}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Date
                                </TableCell>
                                <TableCell align="left">{selectedPaper.date}</TableCell>
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

                    
{/* 

                            id: number;
    title: string;
    paperId: number;
    trackCode: string;
    sessionCode: string;
    sessionChair: string;
    date: string;
    paperAbstract: string;
    pageNumbers: string;
    acknowledgements: string;
    videoEmbed: string;
    slidesUrl: string; */}

                        </TableBody>
                    </Table>
                    </TableContainer>
                
                    </Box>
                </Grid>
                

                <Grid item xs={6}>

                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Paper Detail
                    </Typography>
                
                    <Author author={selectedPaper.presenter} />


                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Authors
                    </Typography>
                    {selectedPaper && selectedPaper.authors.map(p => (
                        <Grid item xs={12}>
                            <Author author={p} />
                            </Grid>
                    ))}
                </Grid>

            </Grid>
            <Grid container spacing={2}>
            <Grid item md={6}>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Video
                    </Typography>
                <Box m={2}>
                        <Video url={selectedPaper.videoEmbed}/>
                </Box>
            </Grid>

            <Grid item md={6}>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Slides
                    </Typography>
                <Box m={2}>
                    <Slides url={selectedPaper.slidesUrl} />
                </Box>
                </Grid>
            </Grid>
            

                


            </Container>

            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Box>
                    <Paper>
                        
                    </Paper>
                </Box>
            </Container>
        </>
    );
}
export default PresentDetail;