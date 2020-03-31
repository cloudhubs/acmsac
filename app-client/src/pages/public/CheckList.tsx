import { Container, List } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AcademicArticle } from "../../model/AcademicArticle";
import { dispatch, useGlobalState } from "../../state";
import { useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

const setAuthorsPapers = (authorsPapers: AcademicArticle[]) => dispatch({
    academicPapers: authorsPapers,
    type: 'setAcademicPapers',
  });


const CheckList = () => {

    let { email } = useParams();

    const history = useHistory();

    const getAcademicPapers = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL +  '/check/' + email, {

                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (response != null){
                const body = await response.json();
                if (!body.error) {
                    setAuthorsPapers(body);
                    console.log(body);
                } else {
                    console.log(body.message);
                    setAuthorsPapers([]);
                }
            } else {
                console.log("server error");
                setAuthorsPapers([]);
            }
        } catch (e) {
            console.log(e);
            setAuthorsPapers([]);
            
        }
        
    };
    
    useEffect(() => {
        localStorage.removeItem("MY_LOCAL_STORAGE_KEY");
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
        history.push("/api/check/" + email + "/" + id);
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

                    {academicPapers && (academicPapers.length == 0) &&

                        <Typography variant="h6" color="inherit" noWrap align="center">
                            No papers available
                        </Typography>

                    }


                    <Divider />
                </Box>
            </Container>
                
        </>
    );
}
export default CheckList;
