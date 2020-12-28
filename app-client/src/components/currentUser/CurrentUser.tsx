import * as React from 'react';
import { Author } from '../../pages/public/Author';
import { useGlobalState } from '../../state';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const CurrentUser = () => {
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
    const [currentUser] = useGlobalState('currentUser');

    return (
        <Container maxWidth="lg" component="main" className={classes.heroContent}>
            <Author author={currentUser} currentUser={currentUser}></Author>
        </Container>
    )
}

export default CurrentUser;