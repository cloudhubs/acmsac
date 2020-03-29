import { Container, List } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGlobalState } from "../../../state";


const TrackList = () => {

    let { track } = useParams();

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

    const [tracks] = useGlobalState('tracks');

    const onClick = (event: React.MouseEvent<HTMLElement>, id) => {
        event.preventDefault();
        //history.push("/api/check/" + email + "/" + id);
    }

    return (
        <>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <Box>

                    {/*<List component="nav" aria-label="main mailbox folders">*/}
                    {/*    {academicPapers && academicPapers.map((p: AcademicArticle) => (*/}
                    {/*        <>*/}
                    {/*            {p.title} - {p.date}*/}
                    {/*        </>*/}
                    {/*    ))*/}
                    {/*    }*/}
                    {/*</List>*/}
                    <Divider />
                </Box>
            </Container>
            {/* <TrackDrawer/> */}

        </>
    );
}
export default TrackList;
