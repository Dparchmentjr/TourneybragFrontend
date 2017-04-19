"use strict";
/**
 @author Dane E. Parchment Jr.
 @version 2.0.0
 @since 03/31/2017
 @desc This component handles the controls for the login modal.
 ----------------------------------------------------------------------*/
import React from "react";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal, Navbar} from "react-bootstrap";
import {userSignupRequest} from "../actions/SignupActions";
import {connect} from "react-redux";
import validator from "validator";
import {isEmpty} from "lodash";

class Signup extends React.Component {
    constructor() {
        super();
        this.handleSignupClick = this.handleSignupClick.bind(this);
        this.closeChooseSignup = this.closeChooseSignup.bind(this);
        this.handlePlayerSignup = this.handlePlayerSignup.bind(this);
        this.handleOrganizerSignup = this.handleOrganizerSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.state = {
            showChooseSignupType: false,
            showOrganizeSignUp: false,
            showPlayerSignUp: false,
            playerUsername: "",
            playerPassword: "",
            playerLocation: "",
            playerDescription: "",
            organizerUsername: "",
            organizerPassword: "",
            organizerLocation: "",
            organizerDescription: "",
            type: "",
            errors: {},
            feedback: {}
        }
    }

    isValidSignup(data) {
        const {errors, feedback, valid} = validateSignup(data);
        if(!valid) {
            this.setState({errors: errors});
            this.setState({feedback: feedback});
        }
        return valid;
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSignupClick() {
        this.setState({showChooseSignupType: true});
    }
    handlePlayerSignup() {
        this.closeChooseSignup();
        this.setState({showPlayerSignUp: true, type: "player"});
    }
    handleOrganizerSignup() {
        this.closeChooseSignup();
        this.setState({showOrganizerSignUp: true, type: "organizer"});
    }

    closeChooseSignup() {
        this.setState({showChooseSignupType: false});
    }

    handleSignup(e) {
        e.preventDefault();
        let userData = {}, loginData = {};
        if(this.state.type === "player") {
            userData = {
                username: this.state.playerUsername,
                type: this.state.type,
                password: this.state.playerPassword,
                location: this.state.playerLocation,
                description: this.state.playerDescription
            }
            loginData = {
                username: this.state.playerUsername,
                password: this.state.playerPassword
            }
        }
        else if(this.state.type === "organizer") {
            userData = {
                username: this.state.organizerUsername,
                type: this.state.type,
                password: this.state.organizerPassword,
                location: this.state.organizerLocation,
                description: this.state.organizerDescription
            }
            loginData = {
                username: this.state.organizerUsername,
                password: this.state.organizerPassword
            }
        }
        if(this.isValidSignup(userData)) {
            this.setState({errors: {}, feedback: {}})
            this.props.userSignupRequest(userData);
            this.setState({showChooseSignupType: false});
            this.setState({showPlayerSignUp: false});
            this.setState({showOrganizerSignUp: false});
        }
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
                        <form onSubmit={this.handleSignup}>
                            <FormGroup controlId="player-username" validationState={this.state.feedback.username}>
                                <ControlLabel>Username:</ControlLabel>
                                <FormControl
                                    name="playerUsername"
                                    type="text"
                                    placeholder="Enter your username here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.username}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="player-password" validationState={this.state.feedback.password}>
                                <ControlLabel>Password:</ControlLabel>
                                <FormControl
                                    name="playerPassword"
                                    type="password"
                                    placeholder="Enter your password here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.password}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="player-location" validationState={this.state.feedback.location}>
                                <ControlLabel>Enter the country you live in:</ControlLabel>
                                <FormControl
                                    name="playerLocation"
                                    type="text"
                                    placeholder="Enter your location here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.location}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="player-description" validationState={this.state.feedback.description}>
                                <ControlLabel>Describe yourself:</ControlLabel>
                                <FormControl
                                    name="playerDescription"
                                    componentClass="textarea"
                                    placeholder="Enter your description here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.description}</HelpBlock>
                            </FormGroup>
                            <Button type="submit">Sign Up</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showOrganizerSignUp} onHide={() => {this.setState({showOrganizerSignUp: false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup As An Organizer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSignup}>
                            <FormGroup controlId="organizer-username" validationState={this.state.feedback.username}>
                                <ControlLabel>Username:</ControlLabel>
                                <FormControl
                                    name="organizerUsername"
                                    type="text"
                                    placeholder="Enter your username here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.username}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="organizer-password" validationState={this.state.feedback.password}>
                                <ControlLabel>Password:</ControlLabel>
                                <FormControl
                                    name="organizerPassword"
                                    type="password"
                                    placeholder="Enter your password here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.password}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="organizer-location" validationState={this.state.feedback.location}>
                                <ControlLabel>Enter the country you live in:</ControlLabel>
                                <FormControl
                                    name="organizerLocation"
                                    type="text"
                                    placeholder="Enter your location here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.location}</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="organizer-description" validationState={this.state.feedback.description}>
                                <ControlLabel>Describe yourself:</ControlLabel>
                                <FormControl
                                    name="organizerDescription"
                                    componentClass="textarea"
                                    placeholder="Enter your description here..."
                                    onChange={this.handleChange}/>
                                <HelpBlock>{this.state.errors.description}</HelpBlock>
                            </FormGroup>
                            <Button type="submit">Sign Up</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Navbar.Form>
        );
    }
}

function validateSignup(data) {
    let errors = {}, feedback = {};
    if(validator.isEmpty(data.username)) {
        errors.username = "This field is required!";
        feedback.username = "error";
    }
    if(validator.isEmpty(data.password)) {
        errors.password = "This field is required!";
        feedback.password = "error";
    }
    if(validator.isEmpty(data.location)) {
        errors.location = "This field is required!";
        feedback.location = "error";
    }
    if(validator.isEmpty(data.description)) {
        errors.description = "This field is required!";
        feedback.description = "error";
    }
    return {
        errors,
        feedback,
        valid: isEmpty(errors)
    };
}

const styles = {
    signupButton: {
        backgroundColor: "#3498db",
        color: "#ecf0f1",
        border: "none"
    }
}

Signup.contextTypes = {
    router: React.PropTypes.object.isRequired
}

Signup.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(Signup);