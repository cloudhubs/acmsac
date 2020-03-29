import React, {FunctionComponent} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Track} from "../../model/Track";
import {useGlobalState} from "../../state";
import {Container} from "@material-ui/core";


const TrackTable = () => {
    const [tracks] = useGlobalState('tracks');
    console.log(tracks);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            autoSizeInput: {
                margin: '2px'
            },
            boxik: {
                padding: '10px'
            },
            heroContent: {
                padding: theme.spacing(8, 0, 6),
            },
        }),
    );
    const classes = useStyles();

    return (
        <div>

            <Container maxWidth="lg" component="main" className={classes.heroContent}>
                <h2>Track Table</h2>
                {tracks && tracks.map((t: Track) => (
                    <>
                        <p>{t.id}</p>
                        <p>{t.code}</p>
                        <p>{t.name}</p>
                        <p>{t.message}</p>
                        <p>{t.trackUrl}</p>
                    </>
                ))}
            </Container>



        </div>
    );
}
export default TrackTable;
