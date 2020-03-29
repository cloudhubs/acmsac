import { Container, List } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AcademicArticle } from "../../model/AcademicArticle";
import { dispatch, useGlobalState } from "../../state";
import FetchTracks from "./FetchTracks";


const TrackList = () => {

    let { track } = useParams();
    const history = useHistory();
    const [token] = useGlobalState('serverToken');

    const getAcademicPapers = async () => {
        FetchTracks.getAcademicPapers(track, history, token);
    };
    
    useEffect(() => {
        getAcademicPapers();
    }, []);


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            heroContent: {
                padding: theme.spacing(8, 0, 6),
            }
            
        }),
    );

    const classes = useStyles();

    const [academicPapers] = useGlobalState('academicPapers');
    
    const onClick = (event: React.MouseEvent<HTMLElement>, id) => {
        event.preventDefault();
        //history.push("/api/check/" + email + "/" + id);
    }

    return (
        <>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Box>

                <List component="nav" aria-label="main mailbox folders">
                        { academicPapers && academicPapers.map( (p: AcademicArticle) => (
                            <ListItem onClick={(event) => {
                                onClick(event, p.id)
                              }} button>
                            <ListItemIcon>
                                <FolderOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={p.title} />
                            </ListItem>
                            ))
                        }
                    </List>
                    <Divider />
                </Box>
            </Container>
            {/* <AppDrawer/> */}
                
        </>
    );
}
export default TrackList;