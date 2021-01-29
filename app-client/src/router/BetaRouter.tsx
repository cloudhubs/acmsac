import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, {useEffect} from "react";
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import TrackList from '../pages/beta/private/TrackList';
import PublicFooter from "../shared/footer/PublicFooter";
import PrivateHeader from '../shared/header/PrivateHeader';
import Login from '../pages/beta/public/Login';
import Signup from '../pages/beta/public/Signup';
import { useGlobalState } from "../state";
import FetchTracks from "../http/FetchTracks";
import { useHistory, useParams } from "react-router-dom";
import TrackDetail from "../pages/beta/private/TrackDetail";
import AcademicPaperDetail from "../pages/beta/private/AcademicPaperDetail";
import PublicHeader from "../shared/header/PublicHeader";
import Index from "../components/Index";
import Search from "../pages/public/Search";
import EarlyRegister from "../pages/public/EarlyRegister";
import PublicRouter from "./PublicRouter";
import CurrentUser from '../components/currentUser/CurrentUser';
import SessionsView from '../pages/beta/private/SessionsView';

const BetaRouter = () => {

    const [auth] = useGlobalState('authenticated');
    console.log(auth);
    const [token] = useGlobalState('serverToken');
    const history = useHistory();

    // const getAcademicPapers = async () => {
    //     FetchTracks.getAllTracks(history, token);
    // };
    //
    // useEffect(() => {
    //     getAcademicPapers();
    // }, []);

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
                                pathname: "/",
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
            {auth && <PrivateHeader /> }
            {!auth && <PublicHeader /> }
                <div>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/app" component={Login} />
                        <Route exact path="/app/register" component={Signup} />
                        <Route exact path="/search" component={PublicRouter} />
                        <Route exact path="/reminder" component={PublicRouter} />
                        <Route exact path="/sessions" component={SessionsView} />
                        <PrivateRoute exact path="/app/currentuser">
                            <CurrentUser/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/app/track">
                            <TrackList/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/app/track/:code">
                            <TrackDetail/>
                        </PrivateRoute>
                        <PrivateRoute>
                            <Route exact path="/app/track/:track/:code" component={AcademicPaperDetail}/>
                        </PrivateRoute>
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
export default BetaRouter;
