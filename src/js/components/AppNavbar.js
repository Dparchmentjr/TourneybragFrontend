import React from "react";

import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { NavItem } from "react-bootstrap"
import { NavDropdown} from "react-bootstrap"
import { MenuItem } from "react-bootstrap"
import Login from "./Login"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class AppNavbar extends React.Component {

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
   <Navbar.Header>
     <Navbar.Brand>
       <Link to="/">
        <a href="#" style={{color: "#eee"}}>TourneyBrag</a>
       </Link>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>
        <NavItem eventKey={1}>
          <Link
            to="/SearchPlayer"
            style={{color: "inherit"}}
          >Players</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link
            to="/SearchTournament"
            style={{color: "inherit"}}
            >Tournaments</Link>
        </NavItem>
        <NavItem eventKey={3}>
          <Link
            to="/Profile"
            style={{color: "inherit"}}
            >Profile</Link>
        </NavItem>
       <Login></Login>
     </Nav>
   </Navbar.Collapse>
 </Navbar>
 </div>

    );
  }
}
