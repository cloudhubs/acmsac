import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import BetaRouter from './router/BetaRouter';
import PublicRouter from './router/PublicRouter';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { withRoot } from './withRoot';

const App = () => {
    const trackingId: string = "UA-162125692-1"
    ReactGA.initialize(trackingId);
    const history = createBrowserHistory();
    // Initialize google analytics page view tracking
    history.listen(location => {
        let hash = location.hash;
        if(hash[0] === '#'){
            hash = hash.substr(1);
        }

        ReactGA.set({ page: hash }); // Update the user's current page
        ReactGA.pageview(hash); // Record a pageview for the given page
    });
    return (
        <Router history={history} basename={"/"}>
            <div>
                <Switch>
                    <Route exact path="/" component={PublicRouter} />
                    <Route exact path="/app" component={BetaRouter} />
                    <Route exact path="/search" component={PublicRouter} />
                    <Route exact path="/reminder" component={PublicRouter} />
                    <Route exact path="/api/check/:email" component={PublicRouter} />
                    <Route exact path="/api/check/:email/:paperId" component={PublicRouter} />
                    <Route exact path="/app/register" component={BetaRouter} />
                    <Route exact path="/app/track" component={BetaRouter} />
                    <Route exact path="/app/track/:track" component={BetaRouter} />
                    <Route exact path="/app/track/:track/:code" component={BetaRouter}/>
                    <Route path="*">
                        <Redirect path="/"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default withRoot(App);
