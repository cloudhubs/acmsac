


import { Box, Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { Link } from 'react-router-dom';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://acmsac.ecs.baylor.edu">
           {'ACM SAC '}
        {new Date().getFullYear()}
        {'.'}
        </Link>

          <div>Developed by: <a color="inherit" target="_blank" href="https://github.com/vinbush" style={{padding: "3px"}}> Vincent Bushong,</a>
              <a color="inherit" target="_blank" href="https://github.com/diptadas" style={{padding: "3px"}}>Dipta Das, </a>
                  <a color="inherit" target="_blank" href="https://github.com/svacina" style={{padding: "3px"}}>Jan Svačina,</a>
                      <a color="inherit" target="_blank" href="https://github.com/walker76" style={{padding: "3px"}}>Andrew Walker,</a>
                          <a color="inherit" target="_blank" href={"https://www.linkedin.com/in/tomascerny/"} style={{padding: "3px"}}>Tomáš Černý</a>
          </div>
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
