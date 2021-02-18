import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useGlobalState, dispatch} from "../../../state";
import { useHistory } from 'react-router-dom';
import { ServerToken } from "../../../model/ServerToken";
import DoLogin from "../../../http/DoLogin";
import FetchCurrentUser from "../../../http/FetchCurrentUser";

// const setServerToken = (serverToken: ServerToken) => dispatch({
//   serverToken: serverToken,
//   type: 'setServerToken',
// });
//
// const setAuthenticated = () => dispatch({
//   type: 'setAuthenticated',
// });






const Login = () => {
    const onSubmit = async (event: React.MouseEvent<HTMLElement>, signInUser, history, token) => {
        event.preventDefault();
        console.log(signInUser);
        await DoLogin.doSend(history, signInUser);
        setTimeout(function(){ }, 1000);
        // await FetchCurrentUser.doFetch(token);
    }

    const history = useHistory();
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
    const [signInUser, uSignInUser] = useGlobalState('signInUser');
    const [token] = useGlobalState('serverToken');
    const [auth] = useGlobalState('authenticated');
    useEffect(() => {
      if (auth) {
        history.push("/");
      }
    }, []);
    return (
        <div>
          {/*<ApplicationBar />*/}
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username or Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={signInUser.usernameOrEmail}
            onChange={(event) => {
              const usernameOrEmail = event.target.value;
              uSignInUser((p) => ({ ...p, usernameOrEmail }));
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInUser.password}
            onChange={(event) => {
              const password = event.target.value;
              uSignInUser((p) => ({ ...p, password }));
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              onSubmit(event, signInUser, history, token)
             }}>
            Sign In
          </Button>
        </form>
      </div>

    </Container>
        </div>
    );
}

export default Login;
