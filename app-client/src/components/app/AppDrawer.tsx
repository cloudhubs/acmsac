import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import AcademicPapersTable from "./AcademicPapersTable";
import tracks from "../../data/Tracks";
import {useGlobalState} from "../../state";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import AppPaperDetail from "../appDetail/AppPaperDetail";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: theme.palette.background.default
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.default
        },
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    }),
);

interface ResponsiveDrawerProps {
    container?: Element;
}

export default function AppDrawer(props: ResponsiveDrawerProps) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    // const [auth] = useGlobalState('authenticated');
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let { id } = useParams();
    let history = useHistory();
    
    const onClick = async (event: React.MouseEvent<HTMLElement>, code: string) => {
        event.preventDefault();
        history.push("/app/" + code);
    }

    const drawer = (
        <>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {tracks.getTracks().map((text, index) => (
                    // <Link to={"/app/"+ text.code} style={{ textDecoration: 'none' }}>
                            <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {
                                onClick(event, text.code)
                            }}>
                            <ListItemText primary={text.track} />
                    </ListItem>
                    // </Link>
                ))}
            </List>
            <Divider />
        </>
    );

    return (
    <Router>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        ACM SAC 2020
                    </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/:app/:track" children={<AcademicPapersTable />} />
                    <Route path="/:app/:track/:paper">
                        <AppPaperDetail />
                    </Route>
                </Switch>
            </main>
        </div>
    </Router>
    );
}
