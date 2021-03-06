"use strict";
/**
 @author Dane E. Parchment Jr.
 @version 2.0.0
 @since 03/31/2017
 @desc This component handles the controls for the login modal.
 ----------------------------------------------------------------------*/
import React from "react";
import LoginModal from "./Login/LoginModal";
import {Button, Navbar} from "react-bootstrap";
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showLogin: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({showLogin: true});
    }

    render() {
        return (
            <Navbar.Form pullRight>
                <Button onClick={this.handleClick} style={styles.loginButton}>Login</Button>
                <LoginModal
                    show={this.state.showLogin}
                    hide={() => {this.setState({showLogin: false})}}/>
            </Navbar.Form>
        );
    }
}

const styles = {
    loginButton: {
        backgroundColor: "#e74c3c",
        color: "#ecf0f1",
        border: "none"
    }
}