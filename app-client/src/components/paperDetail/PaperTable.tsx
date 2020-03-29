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
        }),
    );
    const classes = useStyles();

    return (
        <div>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>
                <Typography variant="h4" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
                    Papers
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Presenter</TableCell>
                                <TableCell align="right">Abstract</TableCell>
                                <TableCell >Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {academicPapers.map( (row: AcademicArticle ) => (
                                <TableRow key={row.id} hover role="checkbox" className={classes.rowClick}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell align="right">{row.presenter.name}</TableCell>
                                    <TableCell align="left">{row.paperAbstract}</TableCell>
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
