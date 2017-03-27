import React from "react";

import  ReactTable  from 'react-table'
import 'react-table/react-table.css'
import SearchTournamentFilter from './SearchTournament/SearchTournamentFilter'
import { tournamentSearchResults } from '../mock-data/TournamentSearchResults'


export default class SearchTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      tournaments: tournamentSearchResults,
      nameFilter: '',
      organizerFilter: '',
      dateFilter: ''
    };
  }

  handleFilterUpdate = (nameVal, organizerVal, dateVal) => {
    this.setState({nameFilter: nameVal,
      organizerFilter: organizerVal,
      dateFilter: dateVal})}


  filterTable(row) {
      return (row.name.toLowerCase().startsWith(this.state.nameFilter.toLowerCase()) || this.state.nameFilter.toLowerCase() == "")
      &&
      (row.organizer.toLowerCase().startsWith(this.state.organizerFilter.toLowerCase()) || this.state.organizerFilter.toLowerCase() == "")
      &&
      (row.date.toLowerCase().startsWith(this.state.dateFilter.toLowerCase()) || this.state.dateFilter.toLowerCase() == "")
  }

  render() {
    let displayTournament = this.state.tournaments.filter(x => this.filterTable(x))

    return (
      <div>
        <SearchTournamentFilter handleFilterUpdate={this.handleFilterUpdate}>
        </SearchTournamentFilter>
        <ReactTable
          data={displayTournament}
          columns={[{header: 'Name', accessor: 'name'},
          {header: 'Organizer', accessor: 'organizer'},
          {header: 'Start Date', accessor: 'date'}]}/>
      </div>
    );
  }
}
