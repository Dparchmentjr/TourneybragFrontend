import React from "react";

import { Col } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { Row }  from 'react-bootstrap'

export default class Comment extends React.Component {

  constructor() {
    super();
    this.state = {
      borderStyle : {border: "1px solid LightGray", borderRadius: "5px",
        padding: "1%", background: "White", margin: "1%"}

    };
  }

 render() {
   let author = this.props.author

    return (
      <div>
        <Col md={12}>
          <Col md={12} style={this.state.borderStyle}>
              <Col md={3}>
                <Image src='../../../resources/placeholder_avatar.svg'></Image>
              </Col>
              <Col md={9} mdPull={2}>
                <Row>
                  <a href="#">{this.props.author}</a>
                </Row>
                <Row>{this.props.content}</Row>
              </Col>
          </Col>
        </Col>
        </div>

    );
  }


}
