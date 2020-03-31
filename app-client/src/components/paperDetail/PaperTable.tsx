import React, {FunctionComponent} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
import { BrowserRouter as Router, useHistory, useParams } from "react-router-dom";
import {AcademicArticle} from "../../model/AcademicArticle";


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

    return (
        <div>

                <div className="breadcrumbs"><a href={"/#/beta"}>ACM SAC 2020</a> >&nbsp; 
                <a href={"/#/beta/track"}>TRACKS</a> >&nbsp;
                {code}</div>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>

            </Container>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>
                <Typography variant="h4" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
                    {code} has {academicPapers.length} papers available
                </Typography>

                <Typography color="textSecondary" component="p" className={classes.subHeroContent}>
                    <Box boxShadow={3}>
                        <Paper className={classes.boxContent}>
                            <h4>{'Track chair message'}</h4>
                            {trackDetail.message}Message message message
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
                                <TableCell >Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {academicPapers.filter(row => row.type != 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode.localeCompare(b.sessionCode);
                            }).map( (row: AcademicArticle ) => (
                                <TableRow key={row.id} hover role="checkbox" className={classes.rowClick} onClick={(event) => {goDetail(event, row)}}>
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
                                            <IconButton onClick={(event) => {goDetail(event, row)}}>
                                                <MoreVertIcon />
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
                                <TableCell >Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {academicPapers.filter(row => row.type == 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
                                return a.sessionCode.localeCompare(b.sessionCode);
                            }).map( (row: AcademicArticle ) => (
                                <TableRow key={row.id} hover role="checkbox" className={classes.rowClick} onClick={(event) => {goDetail(event, row)}}>
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
                                            <IconButton onClick={(event) => {goDetail(event, row)}}>
                                                <MoreVertIcon />
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
