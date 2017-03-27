import React from "react";

import { Navbar } from "react-bootstrap"
import { FormGroup } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Col } from "react-bootstrap"


export default class SearchTournamentFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      nameValue: "",
      organizerValue : "",
      dateValue: ""
    };
  }

  changeName = (e) => this.setState({nameValue: e.target.value})

  changeOrganizer = (e) => this.setState({organizerValue: e.target.value})

  changeDate = (e) => {
    return this.setState({dateValue: e.target.value})}

  changeFilter = () => this.props.handleFilterUpdate(
    this.state.nameValue, this.state.organizerValue, this.state.dateValue)

  render() {

    return (
      <div>
      <Navbar>
    <Navbar.Header>
      <Navbar.Brand >
        <a href="#">Search Tournaments</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form>
        <FormGroup style={{marginRight: "5%", marginLeft: "5%"}}>
          <FormControl type="text" placeholder="Search tournament name"
            value={this.state.nameValue} onChange={this.changeName}/>
        </FormGroup>
        <FormGroup style={{marginRight: "5%"}}>
          <FormControl type="text" placeholder="Search organizer"
            value={this.state.organizerValue}
            onChange={this.changeOrganizer}/>
        </FormGroup>
        <FormGroup style={{marginRight: "5%"}}>
          <FormControl type="date" placeholder="Search start date"
            value={this.state.dateValue}
            onChange={this.changeDate}/>
        </FormGroup>
        {' '}
        <Button type="submit" onClick={this.changeFilter}>Submit</Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
      </div>
    );
  }
}
