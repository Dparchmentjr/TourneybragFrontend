import React from "react";

import  ReactTable  from 'react-table'
import 'react-table/react-table.css'
import SearchPlayerFilter from './SearchPlayer/SearchPlayerFilter'
import { playerSearchResults } from '../mock-data/PlayerSearchResults'


export default class SearchPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      players: playerSearchResults,
      nameFilter: '',
      descriptionFilter: ''
    };
  }

  handleFilterUpdate = (nameValue, descriptionValue) => {
    this.setState({nameFilter: nameValue, descriptionFilter: descriptionValue})}


  filterTable(row) {
      return (row.username.toLowerCase().startsWith(this.state.nameFilter.toLowerCase()) || this.state.nameFilter.toLowerCase() == "")
      &&
      (row.description.toLowerCase().startsWith(this.state.descriptionFilter.toLowerCase()) || this.state.descriptionFilter.toLowerCase() == "")
  }

  render() {
    let displayPlayer = this.state.players.filter(x => this.filterTable(x))

    return (
      <div>
        <SearchPlayerFilter handleFilterUpdate={this.handleFilterUpdate}>
        </SearchPlayerFilter>
        <ReactTable
          data={displayPlayer}
          columns={[{header: 'Name', accessor: 'username'},
          {header: 'Description', accessor: 'description'}]}/>
      </div>
    );
  }
}
