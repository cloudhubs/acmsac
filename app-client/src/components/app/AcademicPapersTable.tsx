import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {useGlobalState} from "../../state";
import {Paper} from "@material-ui/core";
import {AcademicArticle} from "../../model/AcademicArticle";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useParams
} from "react-router-dom";
import AppPaperDetail from "../appDetail/AppPaperDetail";

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
    let redirect = false;
    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
    rowClick: {
        cursor: 'pointer'
    }
});



export default function AcademicPapersTable() {
    let { track } = useParams();
    const [rows, uRows] = useGlobalState('academicPapers');
    // ToDo: filter rows by ID
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const history = useHistory();

    function handleClick(event, key) {
        history.push("/detail/" + track + "/" + key);

        // history.push("/detail");
    }

    let redirect = true;
    console.log(redirect);

    return (
            <Router>
        Track: {track}
        <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Paper Title</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Presentation Date</TableCell>
                    </TableRow>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row: AcademicArticle) => (
                        <TableRow hover key={row.key} onClick={event => handleClick(event, row.key)} className={classes.rowClick}>
                            <TableCell component="th" scope="row">
                                {row.key}
                            </TableCell>
                            <TableCell align="left">{row.paperTitle}</TableCell>
                            <TableCell align="right">{row.author}</TableCell>
                            <TableCell align="right">
                                {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(row.presentationDate))}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
            {/*<Switch>*/}
            {/*    /!*<Route path="/detail">*!/*/}
            {/*    <Route path="/detail/:track/:paper">*/}
            {/*        <AppPaperDetail />*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
        </Router>
    );
}
