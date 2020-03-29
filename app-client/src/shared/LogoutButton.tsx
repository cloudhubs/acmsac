import React from "react";
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from 'react-router-dom';
import { dispatch } from "../state";

const logout = () => dispatch({
    type: 'logout',
  });

const LogoutButton = () => {

    const history = useHistory();
    let location = useLocation();

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            
        }),
    );

    const onLogout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
        logout();
        history.push("/");
    }

    const classes = useStyles();

    return (
        <>
            
                    { !location.pathname.includes("/login") &&
                        <Button color="inherit" onClick={(event: React.MouseEvent<HTMLElement>) => {
                            onLogout(event)
                            }}>Logout</Button>
                    }

        </>
    );
}
export default LogoutButton;
