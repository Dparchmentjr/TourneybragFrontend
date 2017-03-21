import React from "react";
import Title from "./Header/Title";
import { Button } from 'react-bootstrap';

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title title={this.props.title} />
        <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
        <input value={this.props.title} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
