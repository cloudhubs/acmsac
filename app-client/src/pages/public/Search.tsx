import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import { CssBaseline, Container, Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';



const onSubmit = (event: React.MouseEvent<HTMLElement>, email: string, history) => {
    event.preventDefault();
    history.push("/list/" + email);
}



const Search = () => {

    const history = useHistory();

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100%)`
                },
            },
            heroContent: {
                padding: theme.spacing(8, 0, 6),
              },
              subHeroContent: {
                padding: theme.spacing(4, 0, 3),
              },
              submit: {
                margin: theme.spacing(3, 0, 2),
              },
            
        }),
    );

    const inputProps = {
        error: true
      };

    const classes = useStyles();

    const [email, setEmail] = React.useState('');

    return (
        <>
            <CssBaseline />
            
            <Container maxWidth="md" component="main" className={classes.heroContent}>
            <Typography variant="h4" align="center" color="textSecondary" component="p" className={classes.subHeroContent}>
            Find my paper
            </Typography>

            <form  noValidate autoComplete="off">
            <TextField id="email" type="email" inputProps={inputProps} />

            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
                

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              onSubmit(event, email, history)
             }}>
            Sign In
            </Button>

          </form>
            
            {email}

            </Container>
        </>
    );
}
export default Search;