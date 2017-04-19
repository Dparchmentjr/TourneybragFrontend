import React from "react";

import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { NavItem } from "react-bootstrap"
import {Link} from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import LoggedInStrip from "./Login/LoggedInStrip";
import {connect} from "react-redux";
import {logout} from "../actions/LoginAction";

class AppNavbar extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
    }

  render() {
      const {isAuthenticated} = this.props.auth;
      const guestLinks = (
          <div>
          <Login></Login>
          <Signup></Signup>
          </div>
      );

      const userLinks = (
          <div>
              <LoggedInStrip/>
          </div>
      )
    return (
      <div>
      <Navbar inverse collapseOnSelect style={styles.appNavbarStyles}>
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
          <Link to="/search-players" style={{color: "inherit"}}>Players</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link to="/search-tournaments" style={{color: "inherit"}}>Tournaments</Link>
        </NavItem>
     </Nav>
       {isAuthenticated ? userLinks : guestLinks}
   </Navbar.Collapse>
 </Navbar>
 </div>

    );
  }
}

AppNavbar.PropTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

const styles = {
    appNavbarStyles: {
        marginBottom: 0 + "px",
        borderRadius: 0 + "px"
    }
}

export default connect(mapStateToProps, { logout })(AppNavbar);
