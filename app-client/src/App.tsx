import * as React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import BetaRouter from './router/BetaRouter';
import PublicRouter from './router/PublicRouter';
import { withRoot } from "./withRoot";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={PublicRouter} />
                    <Route exact path="/beta" component={BetaRouter} />
                    <Route exact path="/search" component={PublicRouter} />
                    <Route exact path="/register" component={PublicRouter} />
                    <Route exact path="/api/check/:email" component={PublicRouter} />
                    <Route exact path="/api/check/:email/:paperId" component={PublicRouter} />
                    <Route exact path="/beta/register" component={BetaRouter} />
                    <Route exact path="/beta/app/:track" component={BetaRouter} />
                    <Route exact path="/beta/app/:track/:code" component={BetaRouter}/>
                    <Route path="*">
                        <Redirect path="/app/all"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default withRoot(App);