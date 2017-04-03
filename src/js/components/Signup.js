"use strict";
/**
 @author Dane E. Parchment Jr.
 @version 2.0.0
 @since 03/31/2017
 @desc This component handles the controls for the login modal.
 ----------------------------------------------------------------------*/
import React from "react";
import {Button, Navbar} from "react-bootstrap";
export default class Signup extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        alert("We are signing you up for an account!");
    }

    render() {
        return (
            <Navbar.Form pullRight>
                <Button onClick={this.handleClick} style={styles.signupButton}>Signup. It's Free!</Button>
            </Navbar.Form>
        );
    }
}

const styles = {
    signupButton: {
        backgroundColor: "#3498db",
        color: "#ecf0f1",
        border: "none"
    }
}