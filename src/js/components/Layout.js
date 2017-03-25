import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import AppNavbar from "./AppNavbar"
import Login from "./Login"
import SearchPlayer from "./SearchPlayer"

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
      <SearchPlayer></SearchPlayer>



      </div>
    );
  }
}
