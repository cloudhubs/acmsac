import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ChatRow from "./ChatRow";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left' as 'left',
        color: theme.palette.text.secondary
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        height: '100%',
        verticalAlign: 'middle',
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.text.secondary,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

interface IChatProps {
    classes: any;
}

interface IState {
    commentText: string;
    comments: [];
}

interface Comment {
    id: any;
    date: any;
    user: User;
    replies: [];
    content: string;
}

interface User {
    id: any,
    name: string
}

class Chat extends React.Component<IChatProps, IState> {

    public state: IState = {
        commentText: "",
        comments: []
    };

    private onReplyChanged = (event: any) => {
        this.setState({
            commentText: event.target.value
        });
    };

    private submitComment = () => {
        // Send off request and on return, print success - simulated below

        this.setState({
            commentText: ""
        });
    };

    public render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={3}>
                <h3>Chat</h3>

                {this.state.comments.length > 0 ?
                    this.state.comments.map((comment: Comment) => {
                        return (
                            <ChatRow comment={comment}/>
                        );
                    })
                :
                    <Typography className={classes.secondaryHeading}>
                        No comments yet
                    </Typography>
                }

                <br/>

                <form>
                    <TextField
                        placeholder={"Comment"}
                        value={this.state.commentText}
                        style={{minWidth: '75%'}}
                        onChange={this.onReplyChanged}
                    />

                    <Button size="small" color="primary" style={{marginLeft: '15px'}} onClick={this.submitComment}>
                        Submit
                    </Button>
                </form>

            </Paper>

        )
    }
}

export default withStyles(styles)(Chat);