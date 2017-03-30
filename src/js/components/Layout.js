import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import AppNavbar from "./AppNavbar"
import Login from "./Login"
import SearchPlayer from "./SearchPlayer";
import SearchTournament from "./SearchTournament";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
      <Route path="/SearchPlayer" component={SearchPlayer}></Route>
      <Route path="/SearchTournament" component={SearchTournament}></Route>
      </div>
    );
  }
}
