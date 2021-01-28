import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PublicFooter from "../shared/footer/PublicFooter";
import PublicHeader from "../shared/header/PublicHeader";
import Index from "../components/Index";
import EarlyRegister from "../pages/public/EarlyRegister";
import CheckList from "../pages/public/CheckList";
import Search from "../pages/public/Search";
import CheckDetail from "../pages/public/CheckDetail";
import BetaRouter from "./BetaRouter";

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
                        <Route exact path="/app" component={BetaRouter} />
                        <Route exact path="/app/track" component={BetaRouter} />
                        <Route exact path="/app/currentuser" component={BetaRouter} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/reminder" component={EarlyRegister} />
                        <Route exact path="/api/check/:email" component={CheckList} />
                        <Route exact path="/api/check/:email/:paperId" component={CheckDetail} />
                        <Route path="*">
                            <Redirect path="/"/>
                        </Route>
                    </Switch>
                </div>
                <PublicFooter />
            </Router>
        </div>
            
        </>
    );
}
export default PublicRouter;
