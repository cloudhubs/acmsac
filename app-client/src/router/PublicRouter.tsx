import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { HashRouter as Router,BrowserRouter,  Redirect, Route, Link, Switch, useHistory, useLocation } from 'react-router-dom'
import Index from "../components/Index";
import Search from "../pages/public/Search";
import PublicHeader from "../components/header/PublicHeader";
import { Container } from "@material-ui/core";
import PublicFooter from "../components/footer/PublicFooter";
import EarlyRegister from "../pages/public/EarlyRegister";
import PresentDetail from "../pages/public/PresentDetail";
import PresentList from "../pages/public/PresentList";

const PublicRouter = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            root: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              },
            
        }),
    );

    const classes = useStyles();

    return (
        <>
        <div className={classes.root}>
        <Router>
                <PublicHeader />
                <div>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/register" component={EarlyRegister} />
                        <Route exact path="/list/:email" component={PresentList} />
                        <Route exact path="/list/:email/:paperId" component={PresentDetail} />
                        {/* <Route exact path="/register" component={Signup} />
                        <Route exact path="/login" component={Login} /> */}
                        {/* <Route path="*">
                            <Redirect path="/app/all"/>
                        </Route> */}
                    </Switch>
                </div>
                <PublicFooter />
            </Router>
        </div>
            
        </>
    );
}
export default PublicRouter;