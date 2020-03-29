import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const AcademicPaperDetail = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            autoSizeInput: {
                margin: '2px'
            },
            boxik: {
                padding: '10px'
            }
        }),
    );
    const classes = useStyles();
    return (
        <div>
            This is login.
        </div>
    );
}
export default AcademicPaperDetail;
