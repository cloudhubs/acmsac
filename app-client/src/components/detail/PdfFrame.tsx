import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const PdfFrame = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            
        }),
    );

    const classes = useStyles();

    return (
        <>
            <p>PdfFrame</p>
        </>
    );
}
export default PdfFrame;