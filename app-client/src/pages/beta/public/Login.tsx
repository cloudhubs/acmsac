import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useGlobalState, dispatch} from "../../../state";
import { useHistory } from 'react-router-dom';
import { ServerToken } from "../../../model/ServerToken";
import ApplicationBar from "../../../shared/ApplicationBar";


const setServerToken = (serverToken: ServerToken) => dispatch({
  serverToken: serverToken,
  type: 'setServerToken',
});

const setAuthenticated = () => dispatch({
  type: 'setAuthenticated',
});

const onSubmit = async (event: React.MouseEvent<HTMLElement>, signInUser, history) => {
  event.preventDefault();
  
  const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/auth/signin', {
    method: 'POST',
    body: JSON.stringify(signInUser),
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    });
    if (response != null){
        const body = await response.json();
        if (!body.error){
          setServerToken(body);
          setAuthenticated();
          history.push("/beta/track");
        } else {
          console.log(body.message);
        }
    } else {
      console.log("server error");
    }
}




const Login = () => {
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
    const [serverError, uServerError] = useGlobalState('serverError');
    const [signInUser, uSignInUser] = useGlobalState('signInUser');
    const [serverToken, uServerToken] = useGlobalState('serverToken');
    const [auth, uAuth] = useGlobalState('authenticated');
    
    return (
        <div>
          <ApplicationBar />
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              onSubmit(event, signInUser, history)
             }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
        </div>
    );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Login;
