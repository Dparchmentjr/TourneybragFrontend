import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";
import Layout from "./components/Layout";
import {setCurrentUser} from "./actions/LoginAction";
const history = createBrowserHistory();
const app = document.getElementById('app');

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

if(localStorage.user) {
    store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Layout/>
        </Router>
    </Provider>, app
);
