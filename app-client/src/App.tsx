import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import BetaRouter from './router/BetaRouter';
import PublicRouter from './router/PublicRouter';
// import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { withRoot } from './withRoot';
import PublicFooter from './shared/footer/PublicFooter';

const App = () => {
    // const trackingId: string = "UA-162125692-1"
    // ReactGA.initialize(trackingId);
    const history = createBrowserHistory();
    // Initialize google analytics page view tracking
    // history.listen(location => {
    //     ReactGA.set({ page: location.pathname }); // Update the user's current page
    //     ReactGA.pageview(location.pathname); // Record a page view for the given page
    // });
    return (
        <Router history={history} basename={"/"}>
            <div>
                <Switch>
                    <Route exact path="/" component={PublicRouter} />
                    <Route exact path="/app" component={PublicRouter} />
                    <Route exact path="/search" component={PublicRouter} />
                    <Route exact path="/reset" component={PublicRouter} />
                    <Route exact path="/api/check/:email" component={PublicRouter} />
                    <Route exact path="/api/check/:email/:paperId" component={PublicRouter} />
                    <Route exact path="/app/register" component={BetaRouter} />
                    <Route exact path="/app/currentuser" component={BetaRouter} />
                    <Route exact path="/app/track" component={BetaRouter} />
                    <Route exact path="/app/track/:track" component={BetaRouter} />
                    <Route exact path="/app/track/:track/:code" component={BetaRouter}/>
                    <Route exact path="/sessions" component={BetaRouter}/>
                    <Route path="*">
                        <Redirect path="/"/>
                    </Route>
                </Switch>
            </div>
            <PublicFooter />
        </Router>
    );
}

export default withRoot(App);
