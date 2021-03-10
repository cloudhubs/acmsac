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
import Alert from "@material-ui/lab/Alert";
import { Link } from "@material-ui/core";
import DoPasswordChange from "../../../http/DoPasswordChange";

const logout = () => dispatch({
  type: 'logout',
});

const ResetPasswordLoggedIn = () => {
  const history = useHistory();
    const [badPassword, setBadPassword] = React.useState<boolean>(false);
    const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setBadPassword(false);
        if (newPassword !== newPasswordConfirm) {
          setBadPassword(true);
          setPasswordMessage("Passwords do not match!")
          return;
        }
        if (newPassword.length < 8) {
          setBadPassword(true);
          setPasswordMessage("Password must be at least 8 characters long!")
          return;
        }
        let res = await DoPasswordChange.doSend(token, newPassword, newPasswordConfirm, history);
        if (!res) {
          setBadPassword(true);
          setPasswordMessage("An error occurred, please contact the site administrator.");
          return;
        }
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        logout();
        history.push("/app");
    }

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
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState<string>("");
    const [passwordMessage, setPasswordMessage] = React.useState<string>("");
    const [token] = useGlobalState('serverToken');
    const [auth] = useGlobalState('authenticated');
    useEffect(() => {
      if (!auth) {
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
          Change password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => {
              const password = event.target.value;
              setNewPassword(password);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPasswordConfirm"
            label="Confirm New Password"
            type="password"
            id="newPasswordConfirm"
            value={newPasswordConfirm}
            onChange={(event) => {
              const password = event.target.value;
              setNewPasswordConfirm(password);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              onSubmit(event)
             }}>
            Change Password
          </Button>
          {badPassword && 
            <Alert severity="error">{passwordMessage}</Alert>
          }
        </form>
      </div>

    </Container>
        </div>
    );
}

export default ResetPasswordLoggedIn;
