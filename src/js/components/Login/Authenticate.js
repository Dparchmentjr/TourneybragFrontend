import {profiles} from "../../mock-data/profiles";

export let Authenticate = function (data) {
    let username = data.username, password = data.password;
    let errors = {}, feedback = {}, user = {}, valid = false;
    let userFound = false;
    return new Promise(
        function(resolve, reject) {
            //Let's start by looping through the users and seeing if we find a match
            let i = 0;
            for(i; i < profiles.length; i++) {
                let name = profiles[i].username;
                if(username === name) {
                    user = profiles[i];
                    userFound = true;
                    break;
                }
            }
            //The user does not exist so let's reject it, and return the errors
            // and feedback
            if(!userFound) {
                errors.username = "The username you entered does not exist!";
                feedback.username = "error";
                reject({errors, feedback});
            }
            else if(userFound && user.banned.isBanned) { //Banned user
                errors.username = "The username you entered belongs to a banned user!";
                feedback.username = "warning";
                reject({errors, feedback});
            }else if(userFound && !user.banned.isBanned) { //A user has been found and is not banned. let's start checking for password validity
                if(password !== user.password) { //Password does not match
                    errors.password = "The password does not match the user's!";
                    feedback.password = "error";
                    feedback.username = "success";
                    reject({errors, feedback});
                }else { //Matched! Whoohoo! We have login!
                    valid = true;
                    resolve({user, valid});
                }
            }
        }
    );
}