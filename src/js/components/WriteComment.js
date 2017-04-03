import React from "react";

import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

export default class WriteComment extends React.Component {

  constructor() {
    super();
    this.state = {
      comment: ''

    };
  }

  changeComment = (e) => this.setState({comment: e.target.value})

  submitComment = () => {
    this.props.addComment(this.state.comment)
    this.setState({comment: ''})
  }

 render() {


    return (
      <div>
        <Col md={12}>
          <FormGroup controlId="writeCommentTextArea">
           <ControlLabel>Got something to say?</ControlLabel>
           <FormControl componentClass="textarea" placeholder="Write comment..."
            value = {this.state.comment} onChange={this.changeComment}/>
          </FormGroup>
        </Col>
        <Col md={12} mdPush={9} style={{marginLeft: "6.5%"}}>
         <Button bsStyle="primary" onClick={this.submitComment}>Submit Comment</Button>
        </Col>
      </div>

    );
  }


}
