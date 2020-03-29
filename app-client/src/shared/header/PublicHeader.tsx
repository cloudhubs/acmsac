

import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const PublicHeader = () => {

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

    const classes = useStyles();

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        ACM SAC 2020
                    </Typography>
                    <Button color="primary" variant="outlined" className={classes.link}>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button color="primary" variant="outlined" className={classes.link}>
                        <Link to="/search">Search</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
export default PublicHeader;
