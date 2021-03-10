import classes from "*.module.css";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, ButtonBase, IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AcademicArticle } from "../../model/AcademicArticle";

interface PaperListProps {
    papers: AcademicArticle[];
}

const PaperList = (props: PaperListProps) => {

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

    let history = useHistory();

    const goDetail = (event: React.MouseEvent<HTMLElement>, row: AcademicArticle) => {
        event.preventDefault();
        history.push("/app/track/" + row.trackCode + "/" + row.id);
    }

    return (
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
                    {props.papers.map((row: AcademicArticle) => (
                        <TableRow key={row.id} hover role="checkbox" className={classes.rowClick}
                                onClick={(event) => {
                                    goDetail(event, row)
                                }}>
                            <TableCell className={"paper-"+row.id} align="left">{row.sessionCode}</TableCell>
                            <TableCell className={"paper-"+row.paperId} >{row.title}</TableCell>
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
    )
}

export default PaperList;