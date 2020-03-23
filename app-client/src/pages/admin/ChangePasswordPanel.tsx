import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ChangePasswordRow from "./ChangePasswordRow";

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
    },
});

interface IAdminChangePasswordPanelProps {
    classes: any;
}


class ChangePasswordPanel extends React.Component<IAdminChangePasswordPanelProps, {}> {

    public render() {
        const { classes } = this.props;

        const items = [
            {
                heading: "Person 1",
                subHeading: "Email1@email.com",
                content: "content"
            },
            {
                heading: "Person 1",
                subHeading: "Email1@email.com",
                content: "content"
            }
        ];

        return (
            <div className={classes.root}>
                {items.map((item: any) => {
                    return (
                        <ChangePasswordRow key={item.id} name={item.heading} email={item.subHeading} />
                    );
                })}
            </div>
        );
    }
}

export default withStyles(styles)(ChangePasswordPanel);