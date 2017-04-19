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

      tournamentInfo : null,
      user: '',
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
    let loggedinUser = JSON.parse(localStorage.getItem('user'))
    loggedinUser === null ? null : this.setState({user : loggedinUser.username })
    this.getTournament(tourneyName)
  }



  getTournament = (name) => {
    axios.get('https://django.sean-monroe.com/tournamentpage?' + name).
    then( response => {
      this.setState({tournamentInfo: response.data})
      this.setState({rounds : this.matchesToRounds()})
      })

  }

  matchesToRounds = () => {
    let matches = this.state.tournamentInfo.matches
    let roundObj = []
    for(let i in matches) {
      roundObj.push({
        array: [{name : matches[i].playerA}, {name: matches[i].playerB}],
        index: i.toString()
      })
    }
    return roundObj
  }

  changeParticipantName = (e) => {this.setState({participantName: e.target.value})}

  addparticipant = () => {
    axios.post('https://django.sean-monroe.com/apply',
    {
      name: this.state.participantName,
      tournament_entered: this.state.tournamentInfo.name
    }).then(() => {
      let updatedTournament = update(this.state.tournamentInfo,
      {participants: {$push: [{name: this.state.participantName}]}})
      this.setState({tournamentInfo: updatedTournament})
    })
  }


  approveParticipant = (index) => {

    axios.post('https://django.sean-monroe.com/application',
    {
      name: this.state.tournamentInfo.applicants[index].name,
      tournament_entered: this.state.tournamentInfo.name,
      denied: false


    }).then(() => {
      let updatedTournament = update(this.state.tournamentInfo,
        {participants: {$push: [{name: this.state.tournamentInfo.applicants[index].name}]}})
      this.setState({tournamentInfo: updatedTournament})})

  }

  startTournament = () => {this.setState({tournamentStarted: true})}

  changeRoundInfo = (e) => {this.setState({roundInfo: e.target.value})}

  handleEditTournament = () => {this.setState({inputDisabled : !this.state.inputDisabled})}

  handleAddComment = (comment_send) => {
    axios.post('https://django.sean-monroe.com/comment',
    {
      author: this.state.user,
      receiver: this.state.tournamentInfo.name,
      comment: comment_send

    }).then( () => {
            let updatedTournament = update(this.state.tournamentInfo,
              {comments: {$push: [{author_name: this.state.user,
               actual_comment: comment_send}]}})
            this.setState({tournamentInfo: updatedTournament})})

  }

  isOwnTournament = () => {
    if(this.state.user == this.state.tournamentInfo.organizer)
      return true
    else
      return false

  }

  showTournamentEdit = () => {
      if(this.isOwnTournament()) {
       return <Button style={{marginBottom: "1%"}}
        bsStyle={this.state.inputDisabled ? "primary" : "success"}
        onClick={this.handleEditTournament}>
        {this.state.inputDisabled ? "Edit Tournament" : "Done Editing"}
      </Button>
    }
    else
      return ''

  }


  addRound = () => {
      let roundNames = this.state.roundInfo.split('\n')
      axios.post('https://django.sean-monroe.com/create-match',
      {
        tournamentTitle: this.state.tournamentInfo.name,
        playerA: roundNames[0],
        playerB: roundNames[1]
      }).then(() => {
                let roundLength = this.state.rounds.length == 0 ? "1" : (this.state.rounds.length + 1).toString()
                let roundObj = {array : roundNames.map(playerName => {return {name : playerName}}),
                                index: roundLength}
                let updatedRounds = update(this.state.rounds,
                {$push: [roundObj]})
                this.setState({rounds: updatedRounds})
                this.setState({roundInfo: ''})
          })
    }

  tournamentRounds = () => {
    let rounds = this.state.rounds.map( round => {
      return <EditableList key={round.index}
              data={round.array}
              listName={'Round ' + round.index}
              showApproveButton={false}
              tableSize={3}></EditableList>
    })

    if(this.isOwnTournament()) {
        return <Col xs={6} xsPush={3}
                style={Object.assign(this.state.borderStyle, {marginBottom : "2%"})}>
                  <Row>
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
              </Col>
    }
    else {
      return <Col xs={6} xsPush={3}
              style={Object.assign(this.state.borderStyle, {marginBottom : "2%"})}>
                <Row>
                   <Col xs={12} style={{marginBottom: "2%"}}>
                     {rounds}
                   </Col>
               </Row>
            </Col>
    }
  }

  hasApplied = () => {

    for(let applicant of this.state.tournamentInfo.applicants)
      if(applicant.name == this.state.user)
        return true

    for(let participant of this.state.tournamentInfo.participants)
      if(participant.name == this.state.user)
        return true

    return false

  }

  applyToTournament = () => {
    axios.post('https://django.sean-monroe.com/apply',
    {
      name: this.state.user,
      tournament_entered: this.state.tournamentInfo.name

    }).then(res => {
      let updatedTournament = update(this.state.tournamentInfo,
      {applicants: {$push: [{name: this.state.user}]}})
      this.setState({tournamentInfo: updatedTournament})
    })


  }


  showTournamentApply = () => {
    let type = JSON.parse(localStorage.getItem("user"));
    if(type !== null) {
        console.log(type);
        if(!this.isOwnTournament() && !this.hasApplied() && this.state.user != '' && type !== "organizer")
            return <Button bsStyle="success" onClick={this.applyToTournament}>
                Apply to tournament</Button>
        else
            return ''
    }
    else {
        return ""
    }
  }

 render() {

   if(this.state.tournamentInfo) {

     let participants = this.state.tournamentInfo.participants
     let applicants = this.state.tournamentInfo.applicants
     let name = this.state.tournamentInfo.name
     let organizer = this.state.tournamentInfo.organizer
     let date = this.state.tournamentInfo.date

      return (
        <div>
          <Col xs={12} xsPush={3}>
            <h1>{name}</h1>
            <Col xs={12} xsPush={5}>
              {this.showTournamentEdit()}
            </Col>
          </Col>
          <Row>
              {this.tournamentRounds()}
          </Row>
          <Row>
            <Col xs={6} xsPush={3} style={this.state.borderStyle}>
              <h4>Tournament Information</h4>
              {this.showTournamentApply()}
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
                <Col xs={12}>
                  <EditableList
                    data={participants}
                    listName="Participants"
                    showApproveButton={false}
                    tableSize={12}></EditableList>
                </Col>
                <Col xs={12} style={{marginTop: "2%"}}>
                  <EditableList
                    data={applicants}
                    listName="Applicants"
                    showApproveButton={!this.state.inputDisabled}
                    approve={this.approveParticipant}
                    tableSize={12}></EditableList>
                </Col>
                <Col xs={12} style={{marginTop: "1%"}}>
                  <CommentList list={this.state.tournamentInfo.comments}></CommentList>
                  {this.state.user == '' ? '' : <WriteComment addComment={this.handleAddComment}></WriteComment>}
                </Col>

            </Col>
          </Row>
        </div>
      );
    }
    else
      return <div>Loading...</div>
  }



}

Tournament.contextTypes = {
    router: React.PropTypes.object
}
