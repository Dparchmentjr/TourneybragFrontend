"use strict";
import React from "react";
import LoginForm from "./LoginForm";
import {Modal} from  "react-bootstrap";
export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Login To TourneyBrag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        );
    }
}

LoginModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    hide: React.PropTypes.func
}