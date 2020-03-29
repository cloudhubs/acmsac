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

const BetaRouter = () => {

    const [auth] = useGlobalState('authenticated');

    const [token] = useGlobalState('serverToken');
    const history = useHistory();

    const getAcademicPapers = async () => {
        FetchTracks.getAllTracks(history, token);
    };

    useEffect(() => {
        getAcademicPapers();
    }, []);

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
                        <PrivateRoute exact path="/beta/track">
                            <TrackList/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/beta/track/:code">
                            <TrackDetail/>
                        </PrivateRoute>
                        <PrivateRoute>
                            <Route exact path="/beta/track/:track/:code" component={AcademicPaperDetail}/>
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
