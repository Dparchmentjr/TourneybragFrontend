import React from "react";

import  ReactTable  from 'react-table'
import 'react-table/react-table.css'
import SearchTournamentFilter from './SearchTournament/SearchTournamentFilter'
import { tournamentSearchResults } from '../mock-data/TournamentSearchResults'
import axios from 'axios'

export default class SearchTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      tournaments: tournamentSearchResults
    };
  }

  componentDidMount() {

    this.getTournaments('','','')

  }

  getTournaments(nameVal, orgVal, dateVal) {
    axios.post('https://django.sean-monroe.com/list-tournaments', {
            name: nameVal,
            organizer: orgVal,
            date: dateVal,
            status: 'pending'
          })
          .then( response => {
              this.setState({tournaments: response.data.tournaments})
          })

  }

  handleFilterUpdate = (nameVal, organizerVal, dateVal) => {

    this.getTournaments(nameVal, organizerVal, dateVal)

    }

  render() {
    let displayTournament = this.state.tournaments

    return (
      <div>
        <SearchTournamentFilter handleFilterUpdate={this.handleFilterUpdate} style={styles.noBottomMargin}>
        </SearchTournamentFilter>
        <ReactTable style={styles.background}
          data={displayTournament}
          columns={[{header: 'Name', accessor: 'tournamentTitle'},
          {header: 'Organizer', accessor: 'organizerOwner'},
          {header: 'Start Date', accessor: 'date_start'}]}
          getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: e => {
                  this.context.router.history.push('Tournament/'
                  + rowInfo.row.tournamentTitle);
                }
              }
            }}/>
      </div>
    );
  }
}

SearchTournament.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const styles = {
    background: {
        backgroundColor: "#ffffff"
    },
    noBottomMargin: {
        marginBottom: 0 + "px"
    }
}