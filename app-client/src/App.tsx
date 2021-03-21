import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import BetaRouter from './router/BetaRouter';
import PublicRouter from './router/PublicRouter';
// import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { withRoot } from './withRoot';
import PublicFooter from './shared/footer/PublicFooter';
import fetchIntercept from 'fetch-intercept';
import {dispatch} from "./state";

const logout = () => dispatch({
    type: 'logout',
});

const App = () => {

    const unregister = fetchIntercept.register({
        request: function (url, config) {
            // Modify the url or config here
            return [url, config];
        },
    
        requestError: function (error) {
            // Called when an error occured during another 'request' interceptor call
            return Promise.reject(error);
        },
    
        response: function (response) {
            console.log(response);
            if (response.status === 401  && !response.url.includes("signin")) {
                localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
                history.push("/");
                logout();
            }
            // Modify the reponse object
            return response;
        },
    
        responseError: function (error) {
            console.log(error);
            // Handle an fetch error
            return Promise.reject(error);
        }
    });
    

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
                    <Route exact path="/changePassword" component={BetaRouter}/>
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
