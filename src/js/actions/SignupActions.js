import axios from "axios";
import React from "react";

export function userSignupRequest(userData) {
    return dispatch => {
        let valid = false;
        axios.post("https://django.sean-monroe.com/register", userData).then(
            resolve => {alert("Your signup was successful. Login with your account details when you have the chance.")},
            err => {alert("Your username matches that of another, either login with that username or try again with different information.")}
        );
    }
}