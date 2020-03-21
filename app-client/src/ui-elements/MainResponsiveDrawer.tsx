import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import {Grid, GridSpacing, ListSubheader, Paper} from '@material-ui/core';
import Communication from "../components/Communication";
import Canvas from "../components/Canvas";
import {useGlobalState} from "../state";
import PaperList from "../components/PaperList";
import SubResponsiveDrawer from "./SubResponsiveDrawer";

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

export default function MainResponsiveDrawer(props: ResponsiveDrawerProps) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [prophetAppData, update] = useGlobalState('prophetAppData');
    const [selectedMs, updateMs] = useGlobalState('ms');
    const [contextMap, updateContextMap] = useGlobalState('contextMap');
    const [communication, updateCommunication] = useGlobalState('communication');

    const activateMs = (ms: string) => {
        console.log(ms);
        updateContextMap(false);
        updateCommunication(false);
        updateMs(ms);
    }

    const activateGlobal = (global: string) => {
        console.log(global);
        if (global == "Context Map"){
            updateContextMap(true);
            updateCommunication(false);
            updateMs("");
        }

        if (global == "Communication") {
            updateContextMap(false);
            updateCommunication(true);
            updateMs("");
        }
    }



    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const tracks = [
        {track: "BIO - Bioinformatics", paper: 2, poster: 2, SRC: 1},
{track: "BPMEA - Business Process Management & Enterprise Architecture", paper: 6, poster: 1, SRC: 0},
{track: "CASoM - Code Analysis and Software Mining", paper: 4, poster: 4, SRC: 0},
{track: "CC - Cloud Computing", paper: 4, poster: 2, SRC: 1},
{track: "CIVIA - Computational Intelligence and Video & Image Analysis", paper: 2, poster: 1, SRC: 0},
{track: "CPS - Cyber-Physical Systems", paper: 3, poster: 0, SRC: 1},
{track: "DADS - Dependable, Adaptive, and Secure Distributed Systems", paper:  4, poster:  4, SRC: 0},
{track: "DAPP - Decentralized Applications with Blockchain, DLT and Crypto-Currencies", paper:  8, poster: 3, SRC: 2},
{track: "DBDM - Databases and Big Data Management", paper: 5, poster: 0, SRC: 0},
{track: "DASH - Data-Driven Analysis for Software and Hardware Co-Dependability", paper: 3, poster: 0, SRC: 0},
{track: "DM - Data Mining", paper: 4, poster: 3, SRC: 1},
{track: "DS - Data Streams", paper: 3, poster: 2, SRC: 0},
{track: "EC - Applications of Evolutionary Computing", paper: 3, poster: 2, SRC: 0},
{track: "EMBS - Embedded Systems", paper: 5, poster: 3, SRC: 0},
{track: "GIA - GeoInformation Analytics", paper: 4, poster: 2, SRC: 0},
{track: "HI - Health Informatics", paper: 5, poster: 1, SRC: 0},
{track: "IAR - Information Access and Retrieval", paper: 3, poster: 2, SRC: 0},
{track: "IoT - Internet of Things", paper: 5, poster: 3, SRC: 0},
{track: "IRMAS - Intelligent Robotics and Multi-Agent Systems", paper: 6, poster: 3, SRC: 0},
{track: "KLP - Knowledge and Language Processing", paper: 8, poster: 2, SRC: 0},
{track: "KomIS - Knowledge Discovery meets Information Systems", paper: 3, poster: 2, SRC: 0},
{track: "KRR - Knowledge Representation and Reasoning", paper: 5, poster: 1, SRC: 0},
{track: "MCA - Mobile Computing and Applications", paper: 3, poster: 1, SRC: 0},
{track: "MLA - Machine Learning and its Applications", paper: 17, poster: 2, SRC: 1},
{track: "NET - Networking", paper: 5, poster: 2, SRC: 0},
{track: "OS - Operating Systems", paper: 8, poster: 0, SRC: 0},
{track: "PDP - Privacy by Design in Practice", paper: 4, poster: 2, SRC: 0},
{track: "PL - Programming Languages", paper: 3, poster: 3, SRC: 0},
{track: "RE - Requirements Engineering", paper: 7, poster: 3, SRC: 0},
{track: "RS - Recommender Systems: Theory and Applications", paper: 4, poster: 2, SRC: 0},
{track: "SATTA - Software Architecture: Theory, Technology, and Applications", paper:  4, poster: 4, SRC: 1},
{track: "SE - Software Engineering", paper: 15, poster: 5, SRC: 0},
{track: "SEC - Computer Security", paper: 10, poster: 0, SRC: 0},
{track: "SFECS - Sustainability of Fog/Edge Computing Systems", paper: 4, poster: 1, SRC: 0},
{track: "SiSoS - Software-intensive Systems-of-Systems", paper: 2, poster: 0, SRC: 0},
{track: "SONAMA - Social Network and Media Analysis", paper: 7, poster: 4, SRC: 0},
{track: "SP - Software Platforms", paper: 5, poster: 4, SRC: 0},
{track: "SVT - Software Verification and Testing", paper: 9, poster: 0, SRC: 0},
{track: "SWA - Semantic Web and Applications", paper: 5, poster: 1, SRC: 1},
{track: "VPHBA - Video Processing for Human Behavioral Analysis", paper: 6, poster: 2, SRC: 0},
{track: "WCN - Selected Areas of Wireless Communications and Networking", paper: 8, poster: 1, SRC: 0},
{track: "WT - Web Technologies", paper: 3, poster: 2, SRC: 0},
    ];
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <ListSubheader>Overview</ListSubheader>
            <Divider />
             <List>
                {tracks.map((text, index) => (
                    <ListItem button>
                        {/*<ListItemIcon>{ <FolderIcon /> }</ListItemIcon>*/}
                        <ListItemText primary={text.track} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
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
                        Prophet App
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
                    <Canvas/>

                    {/*<ReactPDF*/}
                    {/*    file={{*/}
                    {/*        url: 'http://svacina.net/clanek.pdf'*/}
                    {/*    }}*/}
                    {/*/>*/}
                </main>
            </div>
    );
}
