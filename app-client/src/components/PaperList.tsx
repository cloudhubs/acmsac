import React, {Component, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import {useGlobalState} from "../state";
import Communication from "./Communication";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles( {
        root: {
            width: '100%',
            // maxWidth: 410,
            backgroundColor: theme.palette.background.paper,
        },
        fab: {
            margin: theme.spacing(2),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);


export default function PaperList() {
    return (
        <>
            <CustomPaginationActionsTable/>
        </>
    );
}




