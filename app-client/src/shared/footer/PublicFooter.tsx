


import { Box, Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { Link } from 'react-router-dom';

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