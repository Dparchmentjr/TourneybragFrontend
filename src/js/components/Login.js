import React from "react";
import ReactDOM from "react-dom";
import {Button} from "react-bootstrap";
import {Form, FormControl, FormControlFeedback, FormControlStatic, FormGroup, HelpBlock} from "react-bootstrap"
import {Modal, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarHeader, NavbarToggle, NavDropdown, NavItem} from "react-bootstrap"
import LoginForm from "./Login/LoginForm"
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return(
            <Navbar.Form pullLeft>
                <FormGroup>
                    <Button onClick={this.open}>Login</Button>
                </FormGroup>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login to TourneyBrag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm></LoginForm>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Navbar.Form>
        );
    }

}