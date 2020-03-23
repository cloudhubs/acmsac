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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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

        <Typography variant="h5" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        It is our great pleasure to announce that ACM SAC 2020 is open and to welcome everyone, virtually of course, to Brno Czech Republic!
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            The papers and talk videos are online, and the Slack workspace is ready to host lively discussions.
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            Fortunately, most of you are probably sitting at home, looking for stimulating technical interactions with your colleagues. Please take advantage of this week to “attend” this first online ASPLOS conference. Don't wait, the Slack channel will not stay around forever and, this week, more people will be around to meet and talk to.
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            The Slack workspace is: <a href="https://join.slack.com/t/asplos2020/shared_invite/zt-cgxs6950-E1buN2T7vH6nY5jjp63opQ">https://join.slack.com/t/asplos2020/shared_invite/zt-cgxs6950-E1buN2T7vH6nY5jjp63opQ</a>
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            Click on “Channels” in the left-hand toolbar to see a list of the program session channels. We have created a channel for each session in the conference and have put the talk videos in each channel. The papers themselves are publicly accessible in the ACM digital library (https://dl.acm.org/doi/proceedings/10.1145/3373376).
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
        Please use these channels to discuss the papers in a session, as you would at the conference. Keep in mind that attendees live in many time zones, so conversations may be more asynchronous than when you use Slack with your colleagues down the hall.
        </Typography>

        <Typography variant="h6" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            If you prefer to binge watch ASPLOS, all of the talks are on the SIGARCH YouTube channel: https://www.youtube.com/channel/UCoyvfoA-z0A2sSWmwwwurWA
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
