import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {TextField} from "@material-ui/core";

const styles = (theme: Theme) => ({
    summary: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
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

interface IChatRowProps {
    classes: any;
    comment: Comment;
}

interface IState {
    expanded: boolean;
    commentText: any;
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

interface Reply {
    id: any,
    date: any,
    user: User,
    content: string
}


class ChatRow extends React.Component<IChatRowProps, IState> {

    public state: IState = {
        expanded: false,
        commentText: null,
    };

    private toggleExpanded = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private onReplyChanged = (event: any) => {
        this.setState({
            commentText: event.target.value
        });
    };

    private submitReply = () => {
        // Send off request and on return, print success - simulated below

        this.setState({
            expanded: true
        });
    };

    public render() {
        const { classes } = this.props;

        return (
            <ExpansionPanel expanded={this.state.expanded} onChange={this.toggleExpanded}>
                <ExpansionPanelSummary className={classes.summary} expandIcon={this.props.comment.replies.length > 0 ? <ExpandMoreIcon /> : <div/>}>
                    <Typography>
                        {this.props.comment.user.name} <br/>
                        {this.props.comment.content}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container={true}>
                        {this.props.comment.replies.map((reply: Reply) => {
                            return (<Grid item={true} xs={12}>
                                <Typography>
                                    {reply.user.name} <br/>
                                    {reply.content}
                                </Typography>
                                <Divider />
                            </Grid>);
                        })}
                    </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <form>
                        <TextField
                            label={"Reply"}
                            placeholder={"Reply"}
                            value={this.state.commentText}
                            onChange={this.onReplyChanged}
                        />

                        <Button size="small" color="primary" onClick={this.submitReply}>
                            Reply
                        </Button>
                    </form>
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(ChatRow);