import React from "react";
import {Badge, DropdownButton, FormGroup, FormControl, Glyphicon, MenuItem, Navbar} from "react-bootstrap";
import {logout} from "../../actions/LoginAction";
import {connect} from "react-redux";

class LoggedInStrip extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
    }

    render() {
        const name = this.props.auth.user.username;
        const nameText = (<Navbar.Text>Welcome to TourneyBrag, {name}</Navbar.Text>);
        return(
            <Navbar.Form pullRight>
                {nameText}
                <DropdownButton id="UserDropdown" style={styles.dropdown} title={<Glyphicon glyph="user"/>}>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem divider></MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                </DropdownButton>
                <DropdownButton id="NotificationDropdown" style={styles.dropdown} title={<Glyphicon glyph="bell"/>}></DropdownButton>
            </Navbar.Form>
        );
    }
}

const styles = {
    dropdown: {
        backgroundColor: "#3498db",
        color: "#ecf0f1",
        border: "none",
        marginLeft: 5 + "px",
        marginRight: 5 + "px"
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {logout})(LoggedInStrip);