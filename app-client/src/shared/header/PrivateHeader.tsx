import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import {dispatch, useGlobalState} from "../../state";
import { useHistory, useLocation } from 'react-router-dom';
import {CurrentUser as CurrentUserType} from "../../model/CurrentUser";
import {log} from "util";
import CurrentUser from "../../components/currentUser/CurrentUser";

// const [currentUser] = useGlobalState('currentUser');
// const [author, setAuthor] = React.useState<CurrentUserType>(currentUser);

const logout = () => dispatch({
    type: 'logout',
});
const PrivateHeader = () => {

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

    const history = useHistory();
    let location = useLocation();

    const onLogout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        history.push("/app");
        logout();
    }

    const classes = useStyles();
    const routeTo = (url) => () => history.push(url)
    const [currentUser, setCurrentUser] = useGlobalState('currentUser');

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        ACM SAC 2022
                    </Typography>
                    <Button color="primary" variant="outlined" className={classes.link} onClick={routeTo("/")}>
                        Home
                    </Button>
                    {/*<Button color="primary" variant="outlined" className={classes.link} onClick={routeTo("/sessions")}>*/}
                    {/*    Schedule*/}
                    {/*</Button>*/}
                    <Button color="primary" variant="outlined" className={classes.link} onClick={routeTo("/app/track")}>
                        Tracks
                    </Button>

                    { currentUser.email == 'visitor@acmsac.org' ? null:
                        <Button color="primary" variant="outlined" className={classes.link} onClick={routeTo("/app/currentuser")}>
                            Me
                        </Button>
                    }

                    <Button color="primary" variant="outlined" className={classes.link} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        onLogout(event)
                    }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
export default PrivateHeader;
