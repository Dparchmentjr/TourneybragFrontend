import axios from "axios";
import React from "react";

export function userSignupRequest(userData) {
    return dispatch => {
        axios.post("https://django.sean-monroe.com/register", userData);
    }
}