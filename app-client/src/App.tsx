import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import BetaRouter from './router/BetaRouter';
import PublicRouter from './router/PublicRouter';
import Search from './pages/public/Search';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { withRoot } from './withRoot';

// function PrivateRoute({ children, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//             auth ? (
//                     children
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: { from: location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }


const App = () => {

    console.log(process.env.REACT_APP_GA_TRACKING_ID);
    const trackingId: string = process.env.REACT_APP_GA_TRACKING_ID || "";
    ReactGA.initialize(trackingId);

    const history = createBrowserHistory();

    // Initialize google analytics page view tracking
    history.listen(location => {
        ReactGA.set({ page: location.pathname }); // Update the user's current page
        ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });

    // const [rows, uRows] = useGlobalState('academicPapers');
    // const [auth] = useGlobalState('authenticated');

    // function PrivateRoute({ children, ...rest }) {
    //     return (
    //         <Route
    //             {...rest}
    //             render={({ location }) =>
    //             auth ? (
    //                     children
    //                 ) : (
    //                     <Redirect
    //                         to={{
    //                             pathname: "/login",
    //                             state: { from: location }
    //                         }}
    //                     />
    //                 )
    //             }
    //         />
    //     );
    // }

    const onAnalyze = async () => {
        // const response = await http('https://5e7152a1667af70016317936.mockapi.io/acmsac/papers', {
        //     method: 'get',
        //     headers : {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // });
        // if (response != null){
        //     const body = await response.json();
        //     uRows(body);
        //     return body;
        // }
    };

    // useEffect(() => {
    //     onAnalyze();
    // }, []);


    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route exact path="/" component={PublicRouter} />
                    <Route exact path="/beta" component={BetaRouter} />
                    <Route exact path="/search" component={PublicRouter} />
                    <Route exact path="/register" component={PublicRouter} />
                    <Route exact path="/api/check/:email" component={PublicRouter} />
                    <Route exact path="/api/check/:email/:paperId" component={PublicRouter} />
                    <Route exact path="/beta/register" component={BetaRouter} />
                    <Route exact path="/beta/track" component={BetaRouter} />
                    <Route exact path="/beta/track/:track" component={BetaRouter} />
                    <Route exact path="/beta/track/:track/:code" component={BetaRouter}/>
                    <Route path="*">
                        <Redirect path="/app/all"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default withRoot(App);
