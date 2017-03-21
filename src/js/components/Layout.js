import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import AppNavbar from "./AppNavbar"
import Login from "./Login"

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
      <Login></Login>


      </div>
    );
  }
}
