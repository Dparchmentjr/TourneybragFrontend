import React from "react";

import { Form } from "react-bootstrap"
import { FormGroup } from "react-bootstrap"
import { ControlLabel } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Col } from "react-bootstrap"
import  { profiles } from "../mock-data/profiles"
import update from 'immutability-helper'
import ReactTable from "react-table"
import  CommentList  from "./CommentList"
import WriteComment from "./WriteComment"

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      profile: profiles[0],
      borderStyle : {border: "1px solid LightGray", borderRadius: "5px",
        padding: "1%", background: " #e6ffff"},
      formControlStyle : {background: "#ffffff", cursor: "default",
        marginBottom: "1%"},
      tableStyle : {marginBottom: "2%", background: "white"},
      inputDisabled: true
    };
  }


  handleAddComment = (comment) => {
    let updatedProfile = update(this.state.profile,
      {comments: {$push: [{author: 'AlexThyMan', content: comment}]}})
    this.setState({profile: updatedProfile})

  }

 render() {
   let gamePlays = this.state.profile.gamePlays
   let tourneysPlayed = this.state.profile.tourneysPlayed
   let fans = this.state.profile.fans
    return (
      <div>
          <Col xs={6} xsPush={3}
            style={this.state.borderStyle}>
            <h3 style={{padding: "1%"}}>{this.state.profile.username + "'s profile"}</h3>
            <Form>
              <FormGroup>
                <ControlLabel>Name: </ControlLabel>
                {' '}
                <FormControl style={this.state.formControlStyle}
                  type="text"
                  value={this.state.profile.username}
                  disabled={this.state.inputDisabled}/>
                <ControlLabel>Account Type: </ControlLabel>
                {' '}
                <FormControl style={this.state.formControlStyle}
                  type="text"
                  value={this.state.profile.accountType}
                  disabled={this.state.inputDisabled}/>
                <ControlLabel>Location: </ControlLabel>
                <FormControl style={this.state.formControlStyle}
                  type="text"
                  value={this.state.profile.location}
                  disabled={this.state.inputDisabled}/>
                <ControlLabel>Win/Loss ratio: </ControlLabel>
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    value={this.state.profile.wins / this.state.profile.losses}
                    disabled={true}/>
              </FormGroup>
            </Form>
            <h4>Games I play</h4>
            <ReactTable style= {this.state.tableStyle}
              defaultPageSize={gamePlays.length}
              data={gamePlays}
              columns={[{header: 'Game', accessor: 'gameName'}]}/>
            <h4>Tourneys I've been in</h4>
              <ReactTable style= {this.state.tableStyle}
                defaultPageSize={tourneysPlayed.length}
                data={tourneysPlayed}
                columns={[{header: 'Tournament name', accessor: 'name'},
                {header: 'Organizer', accessor: 'organizer'},
                {header: 'Date', accessor: 'date'}]}/>
            <h4>My fans</h4>
              <ReactTable style= {this.state.tableStyle}
                defaultPageSize={fans.length}
                data={fans}
                columns={[{header: 'Fan name', accessor: 'name'}]}/>
              <CommentList list={this.state.profile.comments}></CommentList>
              <WriteComment addComment={this.handleAddComment}></WriteComment>
          </Col>
      </div>

    );
  }


}
