import React from "react";

import ReactTable from 'react-table'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { tournament } from "../mock-data/Tournament"
export default class Tournament extends React.Component {

  constructor() {
    super();
    this.state = {

      tournamentInfo : tournament,
      borderStyle : {border: "1px solid LightGray", borderRadius: "5px",
        padding: "1%", background: " #e6ffff"},
      tableStyle : {marginBottom: "2%", background: "white"},
      formControlStyle : {background: "#ffffff", cursor: "default",
        marginBottom: "1%"},
      inputDisabled: true

    };
  }

 render() {

   let participants = this.state.tournamentInfo.participants
   let name = this.state.tournamentInfo.name
   let organizer = this.state.tournamentInfo.organizer
   let date = this.state.tournamentInfo.date
    return (
      <div>
        <Col xs={12} xsPush={3}>
          <h1>{name}</h1>
        </Col>
        <Row>
          <Col xs={6} xsPush={3} style={this.state.borderStyle}>
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
            <Col>
              <ReactTable
                style={this.state.tableStyle}
                data={participants}
                defaultPageSize={participants.length}
                columns={[{header: 'Participants', accessor: 'name'}]}/>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }


}
