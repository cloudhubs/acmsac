import React from "react";
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';

const ApplicationBar = () => {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: drawerWidth,
                },
            },
            // menuButton: {
            //     marginRight: theme.spacing(2),
            //     [theme.breakpoints.up('sm')]: {
            //         display: 'none',
            //     },
            // },
        }),
    );

    const classes = useStyles();


    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    edge="start"*/}
                    {/*    onClick={handleDrawerToggle}*/}
                    {/*    className={classes.menuButton}>*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" noWrap>
                        ACM SAC 2020
                    </Typography>
                </Toolbar>
            </AppBar>

        </>
    );
}
export default ApplicationBar;
