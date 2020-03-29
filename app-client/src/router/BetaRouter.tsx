import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { HashRouter as Router,BrowserRouter,  Redirect, Route, Link, Switch, useHistory, useLocation } from 'react-router-dom'
import PublicFooter from "../components/footer/PublicFooter";
import PublicHeader from "../components/header/PublicHeader";
import Login from '../components/Login';
import {useGlobalState} from "../state";
import AppPaperDetail from '../components/appDetail/AppPaperDetail';
import AppDrawer from '../components/app/AppDrawer';
import Signup from '../components/Signup';
import TrackList from '../components/app/TrackList';

const BetaRouter = () => {

    const [auth] = useGlobalState('authenticated');

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

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }

    return (
        <>
        <div className={classes.root}>
        <Router>
                <PublicHeader />
                <div>
                    <Switch>
                        <Route exact path="/beta" component={Login} />
                        <Route exact path="/beta/register" component={Signup} />
                        <PrivateRoute exact path="/beta/app/:track">
                            <TrackList/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/beta/app/:track/:code">
                            <AppPaperDetail/>
                        </PrivateRoute>
                        {/*<Route exact path="/login" component={Login} /> */}
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
export default BetaRouter;