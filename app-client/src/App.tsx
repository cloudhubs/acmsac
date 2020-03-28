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
import Index from "./components/Index";
import PublicRouter from './router/PublicRouter';
import Search from './pages/public/Search';
import BetaRouter from './router/BetaRouter';

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

    const [rows, uRows] = useGlobalState('academicPapers');
    const [auth] = useGlobalState('authenticated');

    

    const onAnalyze = async () => {
        // const response = await fetch('https://5e7152a1667af70016317936.mockapi.io/acmsac/papers', {
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

    useEffect(() => {
        onAnalyze();
    }, []);


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
                    {/* <Route exact path="/register" component={Signup} />
                    <Route exact path="/login" component={Login} /> */}
                    
                    {/* <PrivateRoute exact path="/app/:track">
                        <AppDrawer/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/app/:track/:code">
                        <AppPaperDetail/>
                    </PrivateRoute> */}
                    <Route path="*">
                        <Redirect path="/app/all"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );

}

export default withRoot(App);

// export default App;
