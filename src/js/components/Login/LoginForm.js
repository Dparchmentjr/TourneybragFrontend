import React from "react";
import {Form, FormControl, FormControlFeedback, FormControlStatic, FormGroup} from "react-bootstrap";
import {Button, Checkbox, ControlLabel, HelpBlock} from "react-bootstrap";
import {Users} from "../../mock-data/fake-users";

let UserList = Users, user = null, code = 0

export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            usernameValue: "",
            passwordValue: "",
            passwordDisplayType: "password",
            submitButtonType: "button"
        }
        this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
        this.getPasswordValidationState = this.getUsernameValidationState.bind(this);
        this.togglePasswordDisplayType = this.togglePasswordDisplayType.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.authorizeUser = this.authorizeUser.bind(this);
    }

    getUsernameValidationState(num) {
        alert("Validating Username");
        if(num === 3) {
            alert("Username does not exist!");
            return "error";
        }
        else if(num === 1 || num === 2) {
            alert("Username exists!");
            return "success";
        }
    }

    getPasswordValidationState(num) {
        alert("Validating Password");
        if(num === 2 || num === 3) {
            alert("Password does not match the one for the provided username.");
            return "error";
        }
        else if(num === 1) {
            alert("Password matches!");
            return "success";
        }
    }

   /**
    * @author Dane E. Parchment Jr.
    * @version 1.0.0
    * @description Determines if the login information provided by the user is correct.
    * @param {String} username The username entered by the user in the form
    * @param {String} password The password entered by the user in the form
    * ---------------------------------------------------------------------------------
    * This method will not return anything, instead it will set a few global variables.
    * Firstly, it will set the currently logged in user.
    * Secondly it will set a code that will be used to determine login status:
    *              0 - Nothing has been entered yet (not a return value)
    *              1 - The username and password provided match, successful
    *              2 - The username is correct but the password wrong, fail
    *              3 - The username provided does not exist in the userlist, fail
    */
    authorizeUser(username, password) {
        //First determine if the user exists in the userlist
        var i = 0;
        for(i; i < UserList.length; i++) {
            if(UserList[i].username == username) {
                user = UserList[i];
                break;
            }
        }
        //If that user does exist then check if the password matches that user
        if(user !== null) {
            if(user.password === password) {
                code = 1;
                alert("You have successfully logged in!");
                this.setState({submitButtonType: "submit"});
            }else {
                code = 2;
                alert("Your username exists but the password doesn't match the one for that username.");
                this.setState({submitButtonType: "button"});
            }
        }else {
            code = 3
            alert("The user you have tried to login to does not exist!");
            this.setState({submitButtonType: "button"});
        }
        console.log(code);
    }

    handlePasswordChange(e) {
        this.setState({passwordValue: e.target.value});
    }

    handleUsernameChange(e) {
        this.setState({usernameValue: e.target.value});
    }

    togglePasswordDisplayType() {
        if(this.state.passwordDisplayType === "password") {
            this.setState({passwordDisplayType: "text"});
        }else {
            this.setState({passwordDisplayType: "password"});
        }
    }    

    render() {
        let usernameHelpBlock = <span></span>, passwordHelpBlock = <span></span>;
        if(code == 3) {
            usernameHelpBlock = <HelpBlock>The username provided does not exist!</HelpBlock>
        }
        if(code == 2) {
            passwordHelpBlock = <HelpBlock>The password provided does not match the user!</HelpBlock>
        }
        return (
            <div>
                <Form>
                    <FormGroup controlId="username" validationState={() => {this.getUsernameValidationState(code)}}>
                        <ControlLabel>Enter Username: </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your username here..."
                            onChange={this.handleUsernameChange}>
                            </FormControl>
                        <FormControl.Feedback/>
                        {usernameHelpBlock}
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Enter Password: </ControlLabel>
                        <FormControl
                            type={this.state.passwordDisplayType}
                            placeholder="Enter your password here..."
                            onChange={this.handlePasswordChange}></FormControl>
                        <FormControl.Feedback/>
                        {passwordHelpBlock}
                        <Checkbox onClick={this.togglePasswordDisplayType}>Show Password</Checkbox>
                    </FormGroup>
                    <Button 
                        onClick={() => {this.authorizeUser(this.state.usernameValue, this.state.passwordValue)}}
                        type={this.state.submitButtonType}>Submit</Button>
                    <p>Don't have an account with us? <Button>Sign Up Here!</Button></p>
                </Form>
            </div>
        );
    }
}