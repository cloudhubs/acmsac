import React, {useEffect} from 'react';
// import { GlobalStateProvider } from './state';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import MainResponsiveDrawer from "./ui-elements/MainResponsiveDrawer";
import { withRoot } from "./withRoot";
import SubResponsiveDrawer from "./ui-elements/SubResponsiveDrawer";
import {useGlobalState} from "./state";
import Detail from "./components/Detail";

const App = () => {

    const [rows, uRows] = useGlobalState('rows');

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
        <div>
            <BrowserRouter basename="/" >
                <Route exact path="/" component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Signup}/>
                <Route path="/app" component={MainResponsiveDrawer}/>
                <Route path="/app/:id" children={<Detail />} />
            </BrowserRouter>
        </div>
    );

}

export default withRoot(App);

// export default App;
