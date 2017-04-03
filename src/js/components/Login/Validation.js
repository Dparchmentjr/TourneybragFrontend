import validator from "validator";
import {isEmpty} from "lodash";

/**
 * Validates the input by simply checking if the fields that
 * are required are not empty. If one or more empty fields
 * are discovered then, then the input is considered invalid.
 * @param data - The information from the form, represented by an object
 * @return {errors: {}, feedback: {}, valid: boolean} an object that contains the possible errors of the program
 *         along with a boolean representing valid input.
 */
export default function validateInput(data) {
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