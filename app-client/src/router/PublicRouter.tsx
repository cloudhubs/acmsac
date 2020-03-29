import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PublicFooter from "../components/shared/footer/PublicFooter";
import PublicHeader from "../components/shared/header/PublicHeader";
import Index from "../components/Index";
import EarlyRegister from "../pages/public/EarlyRegister";
import PresentDetail from "../pages/public/PresentDetail";
import PresentList from "../pages/public/PresentList";
import Search from "../pages/public/Search";

const PublicRouter = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            root: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              },
            
        }),
    );

    const classes = useStyles();

    return (
        <>
        <div className={classes.root}>
        <Router>
                <PublicHeader />
                <div>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/register" component={EarlyRegister} />
                        <Route exact path="/api/check/:email" component={PresentList} />
                        <Route exact path="/api/check/:email/:paperId" component={PresentDetail} />
                        
                        {/*<Route exact path="/login" component={Login} /> */}
                        {/* <Route path="*">
                            <Redirect path="/app/all"/>
                        </Route> */}
                    </Switch>
                </div>
                <PublicFooter />
            </Router>
        </div>
            
        </>
    );
}
export default PublicRouter;
