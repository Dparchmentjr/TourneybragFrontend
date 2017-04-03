import React from "react";

import AppNavbar from "./AppNavbar"
import SearchPlayer from "./SearchPlayer";
import SearchTournament from "./SearchTournament";
import HomePage from "./HomePage";
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
      <Route path="/search-players" component={SearchPlayer}></Route>
      <Route path="/search-tournaments" component={SearchTournament}></Route>
      {this.props.children}
      </div>
    );
  }
}
