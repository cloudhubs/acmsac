import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import FetchTrackByCode from "../../http/FetchTrackByCode";
import DoPasswordReminder from "../../http/DoPasswordReminder";
import {ServerMessage} from "../../model/ServerMessage";
import {dispatch, useGlobalState} from "../../state";
import CssBaseline from "@material-ui/core/CssBaseline";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {CustomLink} from "../../shared/CustomLink";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const setReminderMessage = (serverMessage: ServerMessage) => dispatch({
    reminderMessage: serverMessage,
    type: 'setReminderMessage',
});

const EarlyRegister = () => {

    const [email, setEmail] = useState("");
    const [reminderMessage] = useGlobalState('reminderMessage');

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        doSend(email)
    }

    const doSend = async (email) => {
        await DoPasswordReminder.doSend(email);
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }),
    );

    const classes = useStyles();

    useEffect(() => {
        setReminderMessage({success: false, message: ""});
    }, []);

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {!reminderMessage.success && reminderMessage.message != "" && <Alert severity="error">{reminderMessage.message}</Alert>}
                {reminderMessage.success && reminderMessage.message != "" && <Alert severity="info">{reminderMessage.message}</Alert>}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {'Password reminder'}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => {
                                        const email: string = event.target.value;
                                        setEmail(email);
                                    }}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                onClick(event);
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <CustomLink text="Already have an account? Sign in" linkTo="/login"/>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}
export default EarlyRegister;
