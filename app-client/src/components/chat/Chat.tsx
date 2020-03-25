import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary
          }
    }),
);

export const Chat = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={3}>
            <p>Chat</p> 
        </Paper>
        
    )
}