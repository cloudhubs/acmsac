import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { HashRouter as Router,BrowserRouter,  Redirect, Route, Link, Switch, useHistory, useLocation } from 'react-router-dom'

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

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
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
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  subHeroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            ACM SAC 
          </Typography>
          <nav>
            {/*<Link variant="button" color="textPrimary" to="/login" className={classes.link}>*/}
            {/*  Register*/}
            {/*</Link>*/}
          </nav>
          <Button color="primary" variant="outlined" className={classes.link}>
            <Link to="/register">Register</Link>
          </Button>
          <Button color="primary" variant="outlined" className={classes.link}>
            <Link to="/login">Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          ACM SAC 2020
        </Typography>

        <Typography variant="h4" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>

        Virtual Welcome!
        </Typography>


        <Typography variant="h5" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        It is our great pleasure to announce that the ACM SAC 2020 conference platform is now open.  
        </Typography>

        <Typography variant="h5" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        The papers and talk videos are online, along with social contacts to the authors. You may chat and comment to discuss particular papers, with the audience and the authors. 
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        You should have received your login credentials to the platform by email sent on March 30th. Alternatively,  
        please request a password reminder above. You may also register, but note that we limit email addresses only to these of known paper authors, 
        track chairs and organizers (in case of emergency <a href="mailto:someone@example.com" target="_top">email</a> us).
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        Thank you for participating in ACM SAC 2020! All the conference organizers did a fabulous job and hoped to see you all in person in Brno. You did a fabulous job by posting your presentation videos online and we really appreciate such teamwork and allowing us to make this happen remotely.
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        We hope to see you all in ACM SAC 2021, if possible in person.
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        This platform will be open temporarily till mid-April, please make the social connection rather early than late. Also, save your presentation feedback for your personal future work!
        </Typography>

      </Container>
      {/* End hero unit */}
     
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
