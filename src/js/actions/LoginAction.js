import {Authenticate} from "../components/Login/Authenticate";
import {SET_CURRENT_USER} from "./types";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export function login(data) {
    return dispatch => {
        return Authenticate(data).then(
            (resolved) => {
                localStorage.setItem('user', JSON.stringify(resolved.user));
                dispatch(setCurrentUser(resolved.user));
                console.log("Dispatched user!", resolved.user);
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