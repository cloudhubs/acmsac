import * as React from 'react';
import { HashRouter as Router, Route, Link, Switch, useParams, useHistory, useLocation } from 'react-router-dom'
import FakeAuth from './FakeAuth';

export default function SignoutButton(){
    let history = useHistory();

    return FakeAuth.isAuthenticated ? (
        <p>
            <button
                onClick={() => {
                    FakeAuth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <span></span>
    );
}
