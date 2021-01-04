import * as React from 'react';
import { Author } from '../../pages/public/Author';
import { useGlobalState } from '../../state';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import FetchAcademicPapersByUser from '../../http/FetchAcademicPapersByUser';
import { AcademicArticle } from '../../model/AcademicArticle';
import PaperList from './PaperList';

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
    const [token] = useGlobalState('serverToken');
    const [userPapers, setUserPapers] = React.useState<AcademicArticle[]>([]);

    const getUserPapers = async () => {
        setUserPapers(await FetchAcademicPapersByUser.getAcademicPapersByUser(token, currentUser.id));
    }

    useEffect(() => {
        getUserPapers();
    }, []);

    const renderUserFullPapers = () => {
        if (userPapers.filter(row => row.type != 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
            return a.sessionCode.localeCompare(b.sessionCode);
        }).length > 0) {
            return (
                <>
                <h2>Full paper presentations</h2>
                <PaperList papers={userPapers}></PaperList>
                </>
            );
        } else {
            return (
                <h2>No full paper presentations</h2>
            );
        }
    }

    const renderUserPosters = () => {
        if (userPapers.filter(row => row.type == 'Poster').slice().sort((a: AcademicArticle, b: AcademicArticle) => {
            return a.sessionCode.localeCompare(b.sessionCode);
        }).length > 0) {
            return (
                <>
                <h2>Poster presentations</h2>
                <PaperList papers={userPapers}></PaperList>
                </>
            );
        } else {
            return (
                <h2>No poster presentations</h2>
            );
        }
    }

    return (
        <Container maxWidth="lg" component="main" className={classes.heroContent}>
            <h1>Your user information</h1>
            <Author author={currentUser} currentUser={currentUser}></Author>

            <h1>User presentations</h1>
            {renderUserFullPapers()}
            {renderUserPosters()}
        </Container>
    )
}

export default CurrentUser;