import React from "react";

import { Navbar } from "react-bootstrap"
import { FormGroup } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Col } from "react-bootstrap"


export default class SearchPlayerFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      nameValue: "",
      descriptionValue : "",
      typeValue: ""
    };
  }

  changeName = (e) => this.setState({nameValue: e.target.value})

  changeDescription = (e) => this.setState({descriptionValue: e.target.value})

  changeType = (e) => this.setState({typeValue: e.target.value})

  changeFilter = () => this.props.handleFilterUpdate(
    this.state.nameValue, this.state.descriptionValue, this.state.typeValue)

  render() {

    return (
      <div>
      <Navbar>
    <Navbar.Header>
      <Navbar.Brand >
        <a href="#">Search Users</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form>
        <FormGroup style={{marginRight: "5%", marginLeft: "5%"}}>
          <FormControl type="text" placeholder="Search name"
            value={this.state.nameValue} onChange={this.changeName}/>
        </FormGroup>
        <FormGroup style={{marginRight: "5%"}}>
          <FormControl type="text" placeholder="Search description"
            value={this.state.descriptionValue}
            onChange={this.changeDescription}/>
        </FormGroup>
        <FormGroup style={{marginRight: "5%"}}>
          <FormControl type="text" placeholder="Search account type"
            value={this.state.typeValue}
            onChange={this.changeType}/>
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
