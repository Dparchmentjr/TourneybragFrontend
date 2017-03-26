import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import Layout from "./components/Layout";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const history = createBrowserHistory();
const app = document.getElementById('app');
ReactDOM.render(
    <Router>
        <Layout>
        </Layout>
    </Router>, app
);
