import React from "react";

import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { NavItem } from "react-bootstrap"
import { NavDropdown} from "react-bootstrap"
import { MenuItem } from "react-bootstrap"

export default class AppNavbar extends React.Component {

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
   <Navbar.Header>
     <Navbar.Brand>
       <a href="#">TourneyBrag</a>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>
       <NavItem eventKey={1} href="#">Profile</NavItem>
       <NavItem eventKey={2} href="#">Players</NavItem>
       <NavItem eventKey={1} href="#">Tournaments</NavItem>
     </Nav>
   </Navbar.Collapse>
 </Navbar>
 </div>

    );
  }
}
