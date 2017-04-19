"use strict";
import React from "react";
import {validateInput} from "./Validation";
import {login} from "../../actions/LoginAction";
import {Button, Checkbox, FormControl, FormGroup, Glyphicon, HelpBlock, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {},
            feedback: {username: null, password: null},
            isLoggedIn: false,
            displayPassword: "password",
            loggedInPath: null
        }
        this.changePasswordDisplay = this.changePasswordDisplay.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isValidLogin = this.isValidLogin.bind(this);
    }

    changePasswordDisplay() {
        this.state.displayPassword === "password"
            ? this.setState({displayPassword: "text"})
            : this.setState({displayPassword: "password"});
    }

    isValidLogin(data) {
        const {errors, feedback, valid} = validateInput(data);
        if (!valid) {
            this.setState({errors: errors});
            this.setState({feedback: feedback});
        }
        return valid;
    }

    handleLogin(e) {
        e.preventDefault();
        if(this.isValidLogin(this.state)) {
            this.setState({errors: {}, feedback: {}}); //Clear all errors and feedback for authentication submission
            let data = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.login(data);
        }
    }

    onChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleLogin}>
                <FormGroup controlId="username" validationState={this.state.feedback.username}>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                        <FormControl id="username" onChange={this.onChange} type="text" placeholder="Enter your username here..."/>
                        </InputGroup>
                        <HelpBlock>{this.state.errors.username}</HelpBlock>
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup controlId="password" validationState={this.state.feedback.password}>
                    <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph="lock"/></InputGroup.Addon>
                        <FormControl id="password" onChange={this.onChange} type={this.state.displayPassword} placeholder="Enter your password here..."/>
                        </InputGroup>
                        <HelpBlock>{this.state.errors.password}</HelpBlock>
                    <FormControl.Feedback/>
                </FormGroup>
                <Checkbox onChange={this.changePasswordDisplay}>Display Password?</Checkbox>
                <Button type="submit">Login</Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes - {
    router: React.PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm);