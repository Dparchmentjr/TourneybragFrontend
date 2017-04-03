"use strict";
/**
 @author Dane E. Parchment Jr.
 @version 2.0.0
 @since 03/31/2017
 @desc This component handles the controls for the login modal.
 ----------------------------------------------------------------------*/
import React from "react";
import {Button, ControlLabel, FormControl, FormGroup, Modal, Navbar} from "react-bootstrap";
import {Route, Link} from "react-router-dom";
export default class Signup extends React.Component {
    constructor() {
        super();
        this.handleSignupClick = this.handleSignupClick.bind(this);
        this.closeChooseSignup = this.closeChooseSignup.bind(this);
        this.handlePlayerSignup = this.handlePlayerSignup.bind(this);
        this.handleOrganizerSignup = this.handleOrganizerSignup.bind(this);
        this.state = {
            showChooseSignupType: false,
            showOrganizeSignUp: false,
            showPlayerSignUp: false
        }
    }

    handleSignupClick() {
        this.setState({showChooseSignupType: true});
    }
    handlePlayerSignup() {
        this.closeChooseSignup();
        this.setState({showPlayerSignUp: true});
    }
    handleOrganizerSignup() {
        this.closeChooseSignup();
        this.setState({showOrganizerSignUp: true});
    }

    closeChooseSignup() {
        this.setState({showChooseSignupType: false});
    }

    render() {
        return (
            <Navbar.Form pullRight>
                <Button onClick={this.handleSignupClick} style={styles.signupButton}>Signup. It's Free!</Button>
                <Modal show={this.state.showChooseSignupType} onHide={() => {this.setState({showChooseSignupType: false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose your account type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h2>Player</h2>
                            <p>Choose a player if just want to play in tournaments and show off your stats!</p>
                            <Button onClick={this.handlePlayerSignup}>Player</Button>
                        </div>
                        <div>
                            <h2>Organizer</h2>
                            <p>Choose an organizer if just want to host and create tournaments for players!</p>
                            <Button onClick={this.handleOrganizerSignup}>Organizer</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showPlayerSignUp} onHide={() => {this.setState({showPlayerSignUp: false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup As A Player</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="player-username">
                                <ControlLabel>Username:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your username here..."/>
                            </FormGroup>
                            <FormGroup controlId="player-password">
                                <ControlLabel>Password:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your password here..."/>
                            </FormGroup>
                            <FormGroup controlId="player-gameplayed">
                                <ControlLabel>Game Played:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the main game that you play..."/>
                            </FormGroup>
                            <FormGroup controlId="player-maincharacter">
                                <ControlLabel>Favorite Game Character:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your favorite game player..."/>
                            </FormGroup>
                            <Button type="Submit">Sign Up</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showOrganizerSignUp} onHide={() => {this.setState({showOrganizerSignUp: false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup As An Organizer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="player-username">
                                <ControlLabel>Username:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your username here..."/>
                            </FormGroup>
                            <FormGroup controlId="player-password">
                                <ControlLabel>Password:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your password here..."/>
                            </FormGroup>
                            <Button type="Submit">Sign Up</Button>
                        </form>
                    </Modal.Body>
                </Modal>
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