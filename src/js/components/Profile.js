import React from "react";

import { Form } from "react-bootstrap"
import { FormGroup } from "react-bootstrap"
import { ControlLabel } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { Button } from 'react-bootstrap'
import  { profiles } from "../mock-data/profiles"
import update from 'immutability-helper'
import ReactTable from "react-table"
import  CommentList  from "./CommentList"
import WriteComment from "./WriteComment"
import axios from 'axios'

export default class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      profile: null,
      user: '',
      borderStyle : {border: "1px solid LightGray", borderRadius: "5px",
        padding: "1%", background: " #e6ffff"},
      formControlStyle : {background: "#ffffff", cursor: "default",
        marginBottom: "1%"},
      tableStyle : {marginBottom: "2%", background: "white"},
      gamePlay : '',
      inputDisabled: true,
      isOwnProfile : false
    };
  }

  componentDidMount() {
    let username = this.context.router.route.location.pathname.split('/')[2]
    let usertype = this.context.router.route.location.search.substring(1)
    let loggedinUser = JSON.parse(localStorage.getItem('user'))
    loggedinUser === null ? null : this.setState({user : loggedinUser.username })
    this.getProfile(username, usertype)

  }

  getProfile = (username, usertype) => {
    if(usertype == 'player') {
        axios.get('https://django.sean-monroe.com/playerpage?' + username).
        then( response => {
          this.setState({profile: response.data})
          this.state.user == response.data.username ? this.setState({isOwnProfile : true}) : null})
    }
    else if (usertype == 'organizer'){
      axios.get('https://django.sean-monroe.com/organizerpage?' + username).
      then( response => {
        this.setState({profile: response.data})
        this.state.user == response.data.username ? this.setState({isOwnProfile : true}) : null})
    }

  }

  handleChangeLocation = (e) => {
    let updatedProfile = update(this.state.profile,
      {location: {$set: e.target.value }})
    this.setState({profile: updatedProfile})
  }

  handleChangeDescription = (e) => {
    let updatedProfile = update(this.state.profile,
      {description: {$set: e.target.value }})
    this.setState({profile: updatedProfile})
  }

  handleAddComment = (comment_send) => {
    axios.post('https://django.sean-monroe.com/comment',
    {
      author: this.state.user,
      receiver: this.state.profile.username,
      comment: comment_send

    }).then( () => {
                let updatedProfile = update(this.state.profile,
                  {comments:
                    {$push: [{author_name: this.state.user, actual_comment: comment_send}]}})
                this.setState({profile: updatedProfile})})


  }

  handleEditProfile = () => {
    console.log(  {
        username : this.state.profile.username,
        gamePlays : this.state.profile.gamePlays,
        mainChar : this.state.profile.mainChar,
        location : this.state.profile.location,
        description: this.state.profile.description

      })
    if(!this.state.inputDisabled) {
      axios.post('https://django.sean-monroe.com/playerpage',
      {
        username : this.state.profile.username,
        mainchar : this.state.profile.mainchar,
        location : this.state.profile.location,
        description: this.state.profile.description

      })
    }
    this.setState({inputDisabled : !this.state.inputDisabled
    })}

  createEditButton = () => {
    if(this.state.isOwnProfile) {
      return <Button style={{marginBottom: "2%"}}
        bsStyle={this.state.inputDisabled ? "primary" : "success"}
        onClick={this.handleEditProfile}>
        {this.state.inputDisabled ? "Edit Profile" : "Done Editing"}
      </Button>
    }
    else {
      return ''
    }
  }

  becomeFan = () => {
    axios.post('https://django.sean-monroe.com/fan',
    {
      user_Fan: this.state.user,
      user_Idol: this.state.profile.username

    }).then(() => {
        let updatedProfile = update(this.state.profile,
          {fans: {$push: [{user_Fan : this.state.user}]}})
        this.setState({profile: updatedProfile})
      })
  }

  isAlreadyFan = () => {
    for(let fan of this.state.profile.fans) {
      if(fan.user_Fan == this.state.user)
        return true
    }
    return false
  }

  becomeVoucher = () => {
    axios.post('https://django.sean-monroe.com/voucher',
    {
      user_voucher: this.state.user,
      user_receiver: this.state.profile.username

    }).then(() => {
        let updatedProfile = update(this.state.profile,
          {vouchers: {$push: [{user_voucher : this.state.user}]}})
        this.setState({profile: updatedProfile})
      })
  }

  isAlreadyVoucher = () => {
    for(let voucher of this.state.profile.vouchers) {
      if(voucher.user_voucher == this.state.user)
        return true
    }
    return false
  }

  showFanOrVouchButton = () => {
    if(!this.state.isOwnProfile && this.state.user != '') {
      if(this.state.profile.acctType == 'player'
      && !this.isAlreadyFan()) {
        return <Button bsStyle='primary' onClick={this.becomeFan}>
                 Become a fan
               </Button>
      }
      else if (this.state.profile.acctType == 'organizer'
      && !this.isAlreadyVoucher()) {
        return <Button bsStyle='primary' onClick={this.becomeVoucher}>
                Vouch organizer
              </Button>
      }
    }
    return ''

  }


  createUserComponents= () => {

    if(this.state.profile.acctType == 'player') {
      return <div>
      <ControlLabel>Win/Loss ratio: </ControlLabel>
        <FormControl style={this.state.formControlStyle}
          type="text"
          value={this.calculateWinLoss()}
          disabled={true}/>
      <h4>Games</h4>
      {this.showAddGameControl()}
      <ReactTable style= {this.state.tableStyle}
        defaultPageSize={this.state.profile.gamePlays.length}
        data={this.state.profile.gamePlays}
        columns={[{header: 'Game', accessor: 'game'}]}/>
      <h4>Tourneys participated</h4>
        <ReactTable style= {this.state.tableStyle}
          defaultPageSize={this.state.profile.tourneysPlayed.length}
          data={this.state.profile.tourneysPlayed}
          columns={[
            {header: 'Tournament name',
             accessor: 'tournament_entered'}]}/>
        <h4>Fans</h4>
        <ReactTable style= {this.state.tableStyle}
          defaultPageSize={this.state.profile.fans.length}
          data={this.state.profile.fans}
          columns={[{header: 'Fan name', accessor: 'user_Fan'}]}/>
      </div>
    }
    else if(this.state.profile.acctType == 'organizer') {
      return <div>
      <h4>Vouchers</h4>
     <ReactTable style= {this.state.tableStyle}
        defaultPageSize={this.state.profile.vouchers.length}
        data={this.state.profile.vouchers}
        columns={[
          {header: 'Vouchers',
           accessor: 'user_voucher'}]}/>
    <h4>Tournaments</h4>
    <ReactTable style= {this.state.tableStyle}
         defaultPageSize={this.state.profile.tournaments.length}
         data={this.state.profile.tournaments}
         columns={[
           {header: 'Tournaments',
            accessor: 'tournament_name'}]}/>
        </div>
    }
  }

  showAddGameControl = () => {
    if (!this.state.inputDisabled) {
      return  <div>
                  <FormControl style={this.state.formControlStyle}
                  type="text"
                  placeholder="Add game"
                  value={this.state.gamePlay}
                  onChange={this.changeGamePlay}/>
                <Button bsStyle="success" onClick={this.addGamePlay}>
                  Add Game
                </Button>
              </div>

    }
    else {
      return ''
    }
  }

  changeGamePlay = (e) => this.setState({gamePlay : e.target.value })

  addGamePlay = () => {

    let updatedProfile = update(this.state.profile,
      {gamePlays: {$push: [{gameName : this.state.gamePlay}]}})
    this.setState({profile: updatedProfile})

  }

  calculateWinLoss = () => {
    let wl = this.state.profile.wins / this.state.profile.losses
    return isNaN(wl) ? 0 : wl
  }

 render() {
     if(this.state.profile) {
      return (

        <div>
            <Col xs={6} xsPush={3}
              style={this.state.borderStyle}>
              <h3 style={{padding: "1%"}}>{this.state.profile.username + "'s profile"}</h3>
              <Form>
                {this.createEditButton()}
                {this.showFanOrVouchButton()}
                <FormGroup>
                  <ControlLabel>Name: </ControlLabel>
                  {' '}
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    value={this.state.profile.username}
                    disabled={true}/>
                  <ControlLabel>Account Type: </ControlLabel>
                  {' '}
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    value={this.state.profile.acctType}
                    disabled={true}/>
                  <ControlLabel>Location: </ControlLabel>
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    value={this.state.profile.location}
                    onChange={this.handleChangeLocation}
                    disabled={this.state.inputDisabled}/>
                  <ControlLabel>Description: </ControlLabel>
                  <FormControl style={this.state.formControlStyle}
                    type="text"
                    value={this.state.profile.description}
                    onChange={this.handleChangeDescription}
                    disabled={this.state.inputDisabled}/>
                </FormGroup>
              </Form>
                {this.createUserComponents()}
                <CommentList list={this.state.profile.comments}></CommentList>
                {this.state.user == '' ?  '' : <WriteComment addComment={this.handleAddComment}></WriteComment>}
            </Col>
        </div>


      );
    }
    return <div>Loading...</div>
  }


}

Profile.contextTypes = {
    router: React.PropTypes.object
}
