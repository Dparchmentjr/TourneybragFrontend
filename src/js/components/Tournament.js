import React from "react";

import ReactTable from 'react-table'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { tournament } from "../mock-data/Tournament"
import  EditableList from './Tournament/EditableList'
import CommentList from './CommentList'
import WriteComment from './WriteComment'
import update from 'immutability-helper'
import axios from 'axios'

export default class Tournament extends React.Component {

  constructor() {
    super();
    this.state = {

      tournamentInfo : tournament,
      participantName: '',
      tournamentStarted: false,
      roundInfo: '',
      rounds : [],
      inputDisabled: true,
      borderStyle : {border: "1px solid LightGray", borderRadius: "5px",
        padding: "1%", background: " #e6ffff"},
      formControlStyle : {background: "#ffffff", cursor: "default",
        marginBottom: "1%"},

    };
  }

  componentDidMount() {
    let tourneyName = this.context.router.route.location.pathname.split('/')[2]
    this.getTournament(tourneyName)
    console.log('got tournament')
  }



  getTournament = (name) => {
    axios.get('http://django.sean-monroe.com/tournamentpage?' + name).
    then( response => this.setState({tournamentInfo: response.data}))

  }

  changeParticipantName = (e) => {this.setState({participantName: e.target.value})}

  addparticipant = () => {
    let updatedTournament = update(this.state.tournamentInfo,
    {participants: {$push: [{name: this.state.participantName}]}})
    this.setState({tournamentInfo: updatedTournament})}

  removeParticipant = (index) => {let updatedTournament = update(this.state.tournamentInfo,
    {participants: {$splice: [[index,1]]}})
    this.setState({tournamentInfo: updatedTournament})
  }

  startTournament = () => {this.setState({tournamentStarted: true})}

  changeRoundInfo = (e) => {this.setState({roundInfo: e.target.value})}

  addRound = () => {
      let roundArray = this.state.roundInfo.split('\n')
      let roundLength = this.state.rounds.length == 0 ? "1" : (this.state.rounds.length + 1).toString()
      let roundObj = {array : roundArray.map(round => {return {name : round}}),
                      index: roundLength}
      let updatedRounds = update(this.state.rounds,
      {$push: [roundObj]})
      this.setState({rounds: updatedRounds})
    }

  handleEditTournament = () => {this.setState({inputDisabled : !this.state.inputDisabled})}

  handleAddComment = (comment) => {
    let updatedTournament = update(this.state.tournamentInfo,
      {comments: {$push: [{author_name: 'AlexThyMan', actual_comment: comment}]}})
    this.setState({tournamentInfo: updatedTournament})
    console.log(this.state.tournamentInfo)

  }

 render() {

   let participants = this.state.tournamentInfo.participants
   let name = this.state.tournamentInfo.name
   let organizer = this.state.tournamentInfo.organizer
   let date = this.state.tournamentInfo.date

   let rounds = this.state.rounds.map( round => {
     return <EditableList key={round.index}
             data={round.array}
             listName={'Round ' + round.index}
             showRemoveButton={false}
             tableSize={3}></EditableList>
   })

   let tournamentRounds = () => {

     if(this.state.tournamentStarted) {
       return <Row>
                <Col xs={12} style={{marginBottom: "2%"}}>
                  {rounds}
                </Col>
                 <ControlLabel>Round: </ControlLabel>
                 {' '}
                 <FormControl style={this.state.formControlStyle}
                   componentClass="textarea"
                   placeholder="Type in two players seperated by a line..."
                   value={this.state.roundInfo}
                   onChange={this.changeRoundInfo}/>
                 <Button bsStyle="success" onClick={this.addRound}>
                   Add Round
                 </Button>
              </Row>
     }
     else {
       return <Button
               bsStyle="success"
               onClick={this.startTournament}>Start Tournament!
              </Button>
     }

   }

    return (
      <div>
        <Col xs={12} xsPush={3}>
          <h1>{name}</h1>
          <Col xs={12} xsPush={5}>
          <Button style={{marginBottom: "1%"}}
            bsStyle={this.state.inputDisabled ? "primary" : "success"}
            onClick={this.handleEditTournament}>
            {this.state.inputDisabled ? "Edit Tournament" : "Done Editing"}
          </Button>
          </Col>
        </Col>
        <Row>
          <Col xs={6} xsPush={3}
            style={Object.assign(this.state.borderStyle, {marginBottom : "2%"})}>
            {tournamentRounds()}
          </Col>
        </Row>
        <Row>
          <Col xs={6} xsPush={3} style={this.state.borderStyle}>
            <h4>Tournament Information</h4>
            <FormGroup>
              <ControlLabel>Organizer: </ControlLabel>
              {' '}
              <FormControl style={this.state.formControlStyle}
                type="text"
                value={organizer}
                disabled={this.state.inputDisabled}/>
              <ControlLabel>Start date: </ControlLabel>
              {' '}
              <FormControl style={this.state.formControlStyle}
                type="date"
                value={date}
                disabled={this.state.inputDisabled}/>
            </FormGroup>
              <FormGroup>
                <ControlLabel>Add Participant: </ControlLabel>
                {' '}
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    placeholder="Participant name"
                    value={this.state.participantName}
                    onChange={this.changeParticipantName}
                    disabled={this.state.inputDisabled}/>
                  <Button bsStyle="success" onClick={this.addparticipant}>
                    Add Participant
                  </Button>
              </FormGroup>
              <EditableList
                data={participants}
                listName="Participants"
                showRemoveButton={!this.state.inputDisabled}
                removeItem={this.removeParticipant}
                tableSize={12}></EditableList>
              <Col xs={12} style={{marginTop: "1%"}}>
                <CommentList list={this.state.tournamentInfo.comments}></CommentList>
                <WriteComment addComment={this.handleAddComment}></WriteComment>
              </Col>

          </Col>
        </Row>
      </div>
    );
  }
}

Tournament.contextTypes = {
    router: React.PropTypes.object
}
