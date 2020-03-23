import * as React from 'react';
import { HashRouter as Router, Route, Link, Switch, useParams, useHistory, useLocation } from 'react-router-dom'
import FakeAuth from './FakeAuth';

export default function LoginButton(){
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        FakeAuth.authenticate(() => {
            history.replace(from);
            history.push("/app");
        });
    };

    return (
        <div>
            <button onClick={login}>Log in</button>
        </div>
    )
}
