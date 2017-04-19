import validator from "validator";
import {isEmpty} from "lodash";

export function validateInput(data) {
    let errors = {}, feedback = {};
    if(validator.isEmpty(data.username)) {
        errors.username = "This field is required!";
        feedback.username = "error";
    }
    if(validator.isEmpty(data.password)) {
        errors.password = "This field is required";
        feedback.password = "error";
    }
    return {
        errors,
        feedback,
        valid: isEmpty(errors)
    };
}