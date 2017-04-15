import React from "react";

import  ReactTable  from 'react-table'
import 'react-table/react-table.css'
import SearchPlayerFilter from './SearchPlayer/SearchPlayerFilter'
import { playerSearchResults } from '../mock-data/PlayerSearchResults'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

export default class SearchPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {

    this.getUsers('','','')

  }

  getUsers(nameVal, descVal, typeVal) {
    axios.post('https://django.sean-monroe.com/list-users', {
            username: nameVal,
            description: descVal,
            acctType: typeVal
          })
          .then( response => {
              this.setState({users: response.data.users})
          })

  }


  handleFilterUpdate = (nameVal, descVal, typeVal) => {
      this.getUsers(nameVal, descVal, typeVal)
    }

  render() {
    let displayUser = this.state.users
    return (
      <div>
        <SearchPlayerFilter handleFilterUpdate={this.handleFilterUpdate}>
        </SearchPlayerFilter>
        <ReactTable
          data={displayUser}
          columns={[{header: 'Name', accessor: 'username'},
          {header: 'Description', accessor: 'description'},
          {header: 'Account Type', accessor: 'acctType'}]}
          getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: e => {
                  this.context.router.history.push(`Profile/${rowInfo.row.username}?${rowInfo.row.acctType}`);
                }
              }
            }}/>
      </div>
    );
  }
}

SearchPlayer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
