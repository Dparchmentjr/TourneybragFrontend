import {SET_CURRENT_USER} from "./types";
import axios from "axios";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export function login(data) {
    return dispatch => {
        return axios.post("https://django.sean-monroe.com/login", data).then(
            resolved => {
                let user = {
                    username: data.username,
                    type: resolved.data.reason
                }
                if(resolved.data.reason === "User not found") {
                    alert("User not found!");
                }
                else if(resolved.data.reason === "Invalid password") {
                    alert("Invalid password");
                }
                else if(
                    resolved.data.reason !== "Invalid password" &&
                    resolved.data.reason !== "User not found" &&
                    (resolved.data.reason !== "admin" && resolved.data.reason !== "organizer" && resolved.data.reason !== "player")) {
                    alert("This account has been banned for the following reason: " + resolved.data.reason);
                }
                else {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(setCurrentUser(user));
                }

            }
        );
    }
}

export function logout() {
    return dispatch => {
        console.log("Logout action called!");
        localStorage.removeItem("user");
        dispatch(setCurrentUser({}));
    }
}
