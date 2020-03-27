import React from 'react';
import Button from '@material-ui/core/Button';
 
export default class SearchForm extends React.Component {
 
    state = {
        email: '',
    }
 
    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
 
    handleSubmit = () => {
        // your submit logic
    }
 
    render() {
        const { email } = this.state;
        return (
            <></>
        );
    }
}