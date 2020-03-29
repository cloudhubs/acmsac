import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TrackList from '../components/app/TrackList';
import AppPaperDetail from '../components/appDetail/AppPaperDetail';
import PublicFooter from "../components/shared/footer/PublicFooter";
import PrivateHeader from '../components/shared/header/PrivateHeader';
import Login from '../pages/beta/public/Login';
import Signup from '../pages/beta/public/Signup';
import { useGlobalState } from "../state";

const BetaRouter = () => {

    const [auth] = useGlobalState('authenticated');

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
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
                <PrivateHeader />
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
                    </Switch>
                </div>
                <PublicFooter />
            </Router>
        </div>
            
        </>
    );
}
export default BetaRouter;
