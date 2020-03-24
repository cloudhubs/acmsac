import {useEffect} from 'react';
import * as React from 'react'
import { HashRouter as Router,BrowserRouter,  Redirect, Route, Link, Switch, useHistory, useLocation } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import AppDrawer from "./components/app/AppDrawer";
import { withRoot } from "./withRoot";
import {useGlobalState} from "./state";
import AppPaperDetail from "./components/appDetail/AppPaperDetail";
import FakeAuth from './auth/FakeAuth';
import Index from "./components/Index";

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                FakeAuth.isAuthenticated ? (
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

const App = () => {

    const [rows, uRows] = useGlobalState('academicPapers');

    const onAnalyze = async () => {
        const response = await fetch('https://5e7152a1667af70016317936.mockapi.io/acmsac/papers', {
            method: 'get',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response != null){
            const body = await response.json();
            console.log(body);
            uRows(body);
            return body;
        }
    };

    useEffect(() => {
        onAnalyze();
    }, []);


    return (
        <Router>
            <div>

                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/register" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/app">
                        <AppDrawer/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/detail/:code">
                        <AppPaperDetail/>
                    </PrivateRoute>
                    <Route path="*">
                        <Redirect path="/app"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );

}

export default withRoot(App);

// export default App;
