import { Container, Grid, Link, Paper, TableCell, Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from "react";
import { Person } from "../../model/Person";
import { useGlobalState } from "../../state";
import { Author } from "../../pages/public/Author";
import { Slides } from "./Slides";
import { Video } from "./Video";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AcademicArticleUpdate } from "../../model/AcademicArticleUpdate";
import PaperDetailPut from "../../http/PaperDetailPut";
import FetchPresentationById from "../../http/FetchPresentationById";
import { DiscussionEmbed } from 'disqus-react';

const styles = {
  input: {
    color: "white"
  }
};

const PaperDetail = ({classes}) => {

    const [selectedPaper, setSelectedPaper] = useGlobalState('selectedPaper');
    const [currentUser] = useGlobalState('currentUser');

    // console.log(selectedPaper);
    // this is all calculated on the backend now
    // const isAuthorOrAdmin = currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_CHAIR") || 
    //     (selectedPaper.authors ? selectedPaper.authors.filter(author => author.email == currentUser.email).length > 0: false);
    const isEditable = selectedPaper.userCanEdit;
    const [isEditMode, setEditMode] = React.useState<boolean>(false);
    const [token] = useGlobalState('serverToken');
    const [paperUpdate, setPaperUpdate] = React.useState<AcademicArticleUpdate>(new AcademicArticleUpdate(selectedPaper));

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

    const hasVideo = (): boolean => {
        return selectedPaper.videoEmbed != null && selectedPaper.videoEmbed.trim() != "";
    }

    const hasSlides = (): boolean => {
        return selectedPaper.presentation != null && selectedPaper.presentation.embed != "";
    }

    const onSave = async () => {
        const updatedPres = await PaperDetailPut.doSend(token, selectedPaper.id, paperUpdate);
        if (updatedPres === null) {
            console.log("WE FAILED");
            // give notification here
        }
        FetchPresentationById.getById(token, selectedPaper.id);
        setEditMode(false);
    }

    useEffect(() => {
        setPaperUpdate(new AcademicArticleUpdate(selectedPaper));
    }, []);

    return (
        <>
            <Container maxWidth="xl" component="main" className='paperDetail {classes.heroContent}'>
                <div className="breadcrumbs"><a href={"/app"}>ACM SAC 2021</a>&nbsp;
                <a href={"/app/track"}>TRACKS</a>&nbsp;
                <a href={"/app/track/" + selectedPaper.trackCode}>{selectedPaper.trackCode}</a>&nbsp;
                {selectedPaper.sessionCode}</div>
                <Typography variant="h4" align="center" color="textPrimary" component="h1">
                    {selectedPaper.title}
                </Typography>
                <br />
                {isEditable &&
                    <>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={8}>
                            <Paper className={classes.paper}>
                                {isEditMode ?
                                    <Typography variant="body1" align="center" color="textPrimary">
                                        Review your changes and click the Save button to update your presentation. <Button color="primary" variant="outlined" onClick={onSave}>Save</Button> 
                                    </Typography>
                                    :
                                    <>
                                    {(hasVideo() && hasSlides()) ?
                                        <Typography variant="body1" align="center" color="textPrimary">
                                            <i>This is your presentation, or you are authorized to modify it. To update your presentation, click the edit button.</i> <Button color="primary" variant="outlined" onClick={()=>setEditMode(true)}>Edit</Button>
                                        </Typography>
                                        :
                                        <Typography variant="body1" align="center" color="textPrimary" component="p">
                                            <i>NOTE: You are missing {!hasVideo() ? "a video" + (!hasSlides() ? " and slides" : "") : "slides"}. Click the edit button to fix this now!</i> <Button color="primary" variant="outlined" onClick={()=>setEditMode(true)}>Edit</Button>
                                        </Typography>
                                    }
                                    
                                    </>
                                }
                            </Paper>
                        </Grid>
                        
                    </Grid>
                    <br />
                    </>
                }
                { selectedPaper.userCanView && !currentUser.blocked &&
                    <>
                        <Grid container spacing={2} className='slidesVideo'>
                            <Grid item md={6}>
                                <Typography variant="h6" align="center" color="textSecondary" component="p">
                                    Video
                                </Typography>
                                <Paper className="videoBox" style={{ textAlign: "center", padding: "15px", minHeight: "100%"}}>
                                    
                                    {isEditMode &&
                                        <>
                                        <TextField
                                            fullWidth
                                            label="Add new YouTube URL"
                                            value = {paperUpdate.videoUrl}
                                            helperText="Paste in a YouTube URL in the format https://www.youtube.com/watch?v=4vd2rCBjHp8"
                                            onChange={(event) => {
                                                const videoUrl = event.target.value;
                                                setPaperUpdate((p) => ({...p,videoUrl}));
                                            }}
                                        />
                                        </>}
                                    {!isEditMode && <Video url={selectedPaper.videoEmbed} />}
                                </Paper>

                            </Grid>
                            {selectedPaper && selectedPaper.presentation &&
                            <Grid item md={6} alignContent="center">
                                <Typography variant="h6" align="center" color="textSecondary" component="p">
                                    Slides ({<Link target="_blank" className="exLink" href={selectedPaper && selectedPaper.presentation.download}>author link to PDF - if no preview</Link>})
                                </Typography>
                                <Paper className="paperBox" style={{ textAlign: "center", padding: "15px", minHeight: "100%" }}>
                                    {isEditMode && <TextField

                                           fullWidth
                                           label="Add new slides url"
                                           value = {paperUpdate.slidesUrl}
                                           helperText="Paste in a URL leading to your PDF, e.g. 'https://scholar.harvard.edu/files/mickens/files/thisworldofours.pdf'. If using Google Drive, get a public sharing URL; it should follow the format https://drive.google.com/file/d/0Bze24YskmJNeT1VnNUJHdWpwWDQ/view?usp=sharing"
                                           onChange={(event) => {
                                           const slidesUrl = event.target.value;
                                           setPaperUpdate((p) => ({...p,slidesUrl}));
                                           }}
                                      />}
                                      {!isEditMode && <Slides url={selectedPaper && selectedPaper.presentation.embed} />}
                                </Paper>

                            </Grid>
                            }
                        </Grid>
                    </>
                }
                {!selectedPaper.userCanView && selectedPaper.hideFromPublic &&
                    <>
                        <Typography variant="h5" align="center" color="textPrimary" component="h1">
                            Author does not wish to open presentation to the public
                        </Typography>
                    </>
                }
                {!selectedPaper.isReleased && !selectedPaper.userCanView &&
                    <>
                        <Typography variant="body1" align="center" color="textPrimary">
                            This presentation is not yet released. View its details below and check back after its session to view a recorded presentation and its slides!
                        </Typography>
                    </>
                }
                {!selectedPaper.isReleased && selectedPaper.userCanView &&
                    <>
                        <Typography variant="body1" align="center" color="textPrimary">
                            Note: This presentation is not yet released. You can view this because you are either a track chair or an author on the paper. Others will not be able to view your video or slides until the track chair makes it public.
                        </Typography>
                    </>
                }
                <br />
                <br />
                <br />
                {/* <Container maxWidth="xl" component="main" className="chatContainer">
                    <Grid container spacing={4}>
                        <Grid item md={12}>
                            <Chat/>
                        </Grid>
                    </Grid>
                </Container> */}
                {!isEditMode && <Container maxWidth="xl" component="main" className="disqusContainer">
                    <DiscussionEmbed
                        shortname='acmsac2021'
                        config={
                            {
                                url: `https://acmsac.ecs.baylor.edu/app/track/${selectedPaper.trackCode}/${selectedPaper.id}`,
                                identifier: `${selectedPaper.trackCode}/${selectedPaper.id}`,
                                title: `${selectedPaper.trackCode}/${selectedPaper.id}`
                            }
                        }
                    />
                </Container>}
                <Grid container spacing={2} className='authorMeta'>
                    <Grid item md={6}>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            Paper Details
                        </Typography>
                        <TableContainer  component={Paper}>
                            <Table style = {{overflow:"hidden"}} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th">
                                            Title
                                        </TableCell>
                                        <TableCell align="left" scope="row">
                                            {isEditMode ?
                                                    <TextField InputProps={{className:classes.input}} fullWidth
                                                   value = {paperUpdate.title}
                                                   onChange={(event) => {
                                                   const title = event.target.value;
                                                   setPaperUpdate((p) => ({...p,title}));
                                           }}
                                          />: selectedPaper.title}
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
                                            {isEditMode?
                                            <TextField InputProps={{className:classes.input}} fullWidth multiline
                                             value = {paperUpdate.paperAbstract}
                                             onChange={(event) => {
                                             const paperAbstract = event.target.value;
                                             setPaperUpdate((p) => ({...p,paperAbstract}));
                                             }}
                                          />: selectedPaper.paperAbstract}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            ACM URL
                                        </TableCell>
                                        <TableCell  align="left" scope="row">
                                            {/* {isEditMode?
                                            <TextField InputProps={{className:classes.input}} fullWidth
                                             value = {selectedPaper.acmUrl}
                                             onChange={(event) => {
                                             const acmUrl = event.target.value;
                                             setSelectedPaper((p) => ({...p,acmUrl}));
                                           }}
                                          />: <a href={selectedPaper.acmUrl} target="_blank">{selectedPaper.acmUrl}</a>} */}
                                          <a href={selectedPaper.acmUrl} target="_blank">{selectedPaper.acmUrl}</a>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th">
                                            DOI
                                        </TableCell>
                                        <TableCell  align="left" scope="row">
                                            {isEditMode?
                                            <TextField InputProps={{className:classes.input}} fullWidth
                                             value = {paperUpdate.doiUrl}
                                             onChange={(event) => {
                                             const doiUrl = event.target.value;
                                             setPaperUpdate((p) => ({...p,doiUrl}));
                                           }}
                                          />: <a href={selectedPaper.doiUrl} target="_blank">{!!(selectedPaper.doiUrl)?selectedPaper.doiUrl.substring(16):""}</a>}
                                        </TableCell>
                                    </TableRow>
                                    {!!(selectedPaper.pageNumbers) && (
                                        <TableRow>
                                            <TableCell component="th">
                                                Page Numbers
                                            </TableCell>
                                            <TableCell  align="left" scope="row">
                                                {isEditMode?
                                                <TextField InputProps={{className:classes.input}} fullWidth
                                                value = {paperUpdate.pageNumbers}
                                                onChange={(event) => {
                                                const pageNumbers = event.target.value;
                                                setPaperUpdate((p) => ({...p,pageNumbers}));
                                               }}
                                          />: selectedPaper.pageNumbers}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!!(selectedPaper.acknowledgements) && (
                                        <TableRow>
                                            <TableCell component="th">
                                                Acknowledgements
                                            </TableCell>
                                            <TableCell align="left" scope="row">
                                                {isEditMode?
                                                <TextField InputProps={{className:classes.input}} fullWidth
                                                value = {paperUpdate.acknowledgements}
                                                onChange={(event) => {
                                                const acknowledgements = event.target.value;
                                                setPaperUpdate((p) => ({...p,acknowledgements}));
                                               }}
                                          />:selectedPaper.acknowledgements}
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
                        <Author author={selectedPaper.presenter} currentUser={currentUser} isEditable={false} setAuthor={(p)=>{}} />
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}
export default withStyles(styles)(PaperDetail);
