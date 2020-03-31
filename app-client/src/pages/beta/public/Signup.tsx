import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useGlobalState} from "../../../state";
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { ServerError } from '../../../model/ServerError';
import { CustomLink } from '../../../shared/CustomLink';

const Signup = () => {
const classes = useStyles();
const [serverResponse, uServerResp] = useGlobalState('serverError');
const [signUpUser, uSignUpUser] = useGlobalState('signUpUser');
const [auth, uAuth] = useGlobalState('authenticated');
let history = useHistory();

const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
  event.preventDefault();
  let se = new ServerError();
  se.success = true;
  uServerResp(se);
  const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signUpUser),
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    });
    if (response != null){
        const body = await response.json();
        if (body.success){
          history.push("/track");
          uAuth(true);
        } else {
          console.log(body.message);
        }
        uServerResp(body);
    } else {
      console.log("server error");
    }
}

  return (
    <Container className="topSpace" component="main" maxWidth="xs">
      <CssBaseline />
      {!serverResponse.success && <Alert severity="error">{serverResponse.message}</Alert>}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={signUpUser.name}
                onChange={(event) => {
                  const name = event.target.value;
                  uSignUpUser((p) => ({ ...p, name }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="uname"
                variant="outlined"
                required
                fullWidth
                id="uname"
                label="Username"
                value={signUpUser.username}
                onChange={(event) => {
                  const username = event.target.value;
                  uSignUpUser((p) => ({ ...p, username }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signUpUser.email}
                onChange={(event) => {
                  const email = event.target.value;
                  uSignUpUser((p) => ({ ...p, email }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signUpUser.password}
                onChange={(event) => {
                  const password = event.target.value;
                  uSignUpUser((p) => ({ ...p, password }));
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
              onSubmit(event)
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup;




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

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
