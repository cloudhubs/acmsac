

import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom'
import DoPasswordReminder from "../../http/DoPasswordReminder";
import DoLogin from "../../http/DoLogin";
import {SignInUser} from "../../model/SignInUser";
import {useGlobalState} from "../../state";
import FetchCurrentUser from "../../http/FetchCurrentUser";

//                borderBottom: `1px solid ${theme.palette.divider}`,
const PublicHeader = () => {

    const history = useHistory();

    const [token] = useGlobalState('serverToken');

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              toolbar: {
                flexWrap: 'wrap',
              },
              toolbarTitle: {
                flexGrow: 1,
              },
              link: {
                margin: theme.spacing(1, 1.5),
              },

            
        }),
    );

    const onHome = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        history.push("/");
    }

    const onSearch = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        history.push("/search");
    }

    const onPasswordReminder = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        history.push("/reminder");
    }

    const onLogin = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        history.push("/app");
    }

    const onVisitorLogin = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        let signInUser = new SignInUser();
        signInUser.usernameOrEmail = "visitor@acmsac.org";
        signInUser.password = "caey88";
        await DoLogin.doSend(history, signInUser);
        setTimeout(function(){ }, 1000);
        // await FetchCurrentUser.doFetch(token);
    }



    const classes = useStyles();

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        ACM SAC 2022
                    </Typography>
                    <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        onHome(event)
                    }}>
                        Home
                    </Button>

                    {/* <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        onSearch(event)
                    }}>
                        Search
                    </Button>

                    <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        onPasswordReminder(event)
                    }}>
                        Password Reminder
                    </Button> */}

                    {/*{ <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {*/}
                    {/*    onVisitorLogin(event)*/}
                    {/*}}>*/}
                    {/*    Tour*/}
                    {/*</Button> }*/}

                    <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        onLogin(event)
                    }}>
                        Login
                    </Button>

                </Toolbar>
            </AppBar>
        </>
    );
}
export default PublicHeader;
