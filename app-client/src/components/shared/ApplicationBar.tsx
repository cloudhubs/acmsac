import React from "react";
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import { Button } from "@material-ui/core";
import LogoutButton from "./LogoutButton";

const ApplicationBar = () => {

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            title: {
                flexGrow: 1,
              },
        }),
    );

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap  className={classes.title}>
                        ACM SAC 2020
                    </Typography>
                    <LogoutButton />
                    
                </Toolbar>
            </AppBar>

        </>
    );
}
export default ApplicationBar;
