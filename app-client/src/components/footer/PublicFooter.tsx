


import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { Container, Box } from "@material-ui/core";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
           {'ACM SAC '}
        {new Date().getFullYear()}
        {'.'}
        </Link>
      </Typography>
    );
  }

const PublicFooter = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            footer: {
                marginTop: 'auto',
                borderTop: `1px solid ${theme.palette.divider}`,
                // marginTop: theme.spacing(8),
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
                [theme.breakpoints.up('sm')]: {
                paddingTop: theme.spacing(6),
                paddingBottom: theme.spacing(6),
                },
            },
            
        }),
    );

    const classes = useStyles();

    return (
        <>
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}
export default PublicFooter;