import React from "react";

import { FormGroup } from "react-bootstrap"
import { ControlLabel } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { HelpBlock } from "react-bootstrap"

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  getValidationState() {
   const length = this.state.value.length;
   if (length > 10) return 'success';
   else if (length > 5) return 'warning';
   else if (length > 0) return 'error';
 }

 handleChange(e) {
   var value = e.target.value
   this.setState({ value });
 }

 render() {
    return (
      <div>
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
      </div>
    );
  }


}
