import React, {FunctionComponent} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Track} from "../../model/Track";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useGlobalState} from "../../state";
import {
    ButtonBase,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";



const TrackTable = () => {
    const [tracks] = useGlobalState('tracks');
    console.log(tracks);

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
            }
        }),
    );
    const classes = useStyles();

    return (
        <div>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>
                <h2>Track Table</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Code</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Track URL</TableCell>
                                    <TableCell >Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tracks.map(row => (

                                        <TableRow key={row.id} hover role="checkbox" className={classes.rowClick}>

                                            <TableCell component="th" scope="row" >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.code}</TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{<Link target="_blank" href={row && row.trackUrl}>{row.trackUrl}</Link>}</TableCell>
                                            <ButtonBase>
                                            <TableCell> <MoreVertIcon /> </TableCell>
                                            </ButtonBase>
                                        </TableRow>


                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Container>



        </div>
    );
}
export default TrackTable;
