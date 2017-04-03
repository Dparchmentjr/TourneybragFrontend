import React from "react";
import Layout from "./components/Layout";
import {Route} from  "react-router-dom";
import HomePage from "./components/HomePage";
import SearchPlayer from "./components/SearchPlayer";
import SearchTournament from "./components/SearchTournament";

export default (
    <Route path="/" component={Layout}>
        <Route exact path="/" component={HomePage}/>
        <Route path="/search-players" component={SearchPlayer}/>
        <Route path="/search-tournaments" component={SearchTournament}/>
    </Route>
)