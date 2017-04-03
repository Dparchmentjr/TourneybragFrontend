import React from "react";

import AppNavbar from "./AppNavbar"
import SearchPlayer from "./SearchPlayer";
import SearchTournament from "./SearchTournament";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Tournament from "./Tournament"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
      <AppNavbar></AppNavbar>
      <Route exact path="/" component={HomePage}></Route>
		{/*<Route path="/SearchPlayer" component={SearchPlayer}></Route>*/}
		{/*<Route path="/SearchTournament" component={SearchTournament}></Route>*/}
      <Route path="/Profile" component={Profile}></Route>
      <Route path="/Tournament" component={Tournament}></Route>
      <Route path="/search-players" component={SearchPlayer}></Route>
      <Route path="/search-tournaments" component={SearchTournament}></Route>
      {this.props.children}
      </div>
    );
  }
}
