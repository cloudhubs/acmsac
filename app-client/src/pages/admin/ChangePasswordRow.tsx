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

interface IAdminChangePasswordRowProps {
    classes: any;
    name: any;
    email: any;
}

interface IState {
    expanded: boolean;
    form: boolean;
    message: string;
    password: string;
    confirmPassword: string;
}


class ChangePasswordRow extends React.Component<IAdminChangePasswordRowProps, IState> {

    public state: IState = {
        expanded: false,
        form: false,
        message: null,
        password: "",
        confirmPassword: "",
    };

    private toggleExpanded = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private toggleForm = () => {
        this.setState({
            form: !this.state.form,
        });
    };

    private onPasswordChange = (event: any) => {
        this.setState({
            password: event.target.value
        });
    };

    private onConfirmPasswordChange = (event: any) => {
        this.setState({
            confirmPassword: event.target.value
        });
    };

    private submitForm = () => {
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                form: true,
                expanded: true,
                message: "Passwords do not match"
            });
        } else {

            // Send off request and on return, print success - simulated below

            this.setState({
                form: false,
                expanded: true,
                message: "Password change successful"
            });
        }
    };

    protected setMessage = (msg: string) => {
        this.setState({
            message: msg,
        });
    };

    public render() {
        const { classes } = this.props;

        return (
            <ExpansionPanel expanded={this.state.expanded} onChange={this.toggleExpanded}>
                <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{this.props.name}</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.email}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container={true}>
                        <Grid item={true} xs={12}>
                            {this.state.form ?
                                <div>
                                    <form>
                                        <TextField
                                            label={"New Password"}
                                            placeholder={"New Password"}
                                            value={this.state.password}
                                            onChange={this.onPasswordChange}
                                        />

                                        <TextField
                                            label={"Confirm Password"}
                                            placeholder={"Confirm Password"}
                                            value={this.state.confirmPassword}
                                            onChange={this.onConfirmPasswordChange}
                                        />

                                        <Button size="small" color="primary" onClick={this.submitForm}>
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                                :
                                <Typography>
                                    <p>Joined On:</p>
                                    <p>Papers: </p>
                                </Typography>
                            }
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Typography>
                                <p>{this.state.message ? this.state.message : ""}</p>
                            </Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button size="small" color="primary" onClick={this.toggleForm}>
                        {this.state.form ? "Hide Form" : "Change Password"}
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(ChangePasswordRow);