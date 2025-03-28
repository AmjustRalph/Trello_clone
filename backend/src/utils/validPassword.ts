
import { throwError } from "./throwError";


const validPassword = (password: string) => {
    console.log(typeof password)
if (typeof password !== "string" || password.trim() === "") {
    throwError("Invalid Password: Must be a non-empty string", 400);
}

// Ensure password is at least 8 characters long
if (password.length < 8) {
    throwError("Invalid Password: Must be at least 8 characters long", 400);
}

// Ensure password contains at least one special character but not all characters being special
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
const allSpecialCharRegex = /^[!@#$%^&*(),.?":{}|<>]+$/;

if (!specialCharRegex.test(password)) {
    throwError("Invalid Password: Must contain at least one special character", 400);
}

if (allSpecialCharRegex.test(password)) {
    throwError("Invalid Password: Cannot contain only special characters", 400);
}
}

export {validPassword}