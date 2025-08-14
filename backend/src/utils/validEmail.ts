import { throwError } from "./throwError.ts";


const validateEmail = (email: string) => {

    if (!email || email.trim() === "") {
        throwError("Invalid email format: Email must be a non-empty string", 400);
    }

    const parts = email.split("@");

    if (parts.length !== 2) {
     throwError("Invalid email format: Must contain exactly one '@' symbol", 400);
    }

    const localPart: string = parts[0] ?? "";

    if (/^\d+$/.test(localPart)) {
        throwError("Invalid email: Local part must not contain only numbers", 422);
    }

    // if (localPart.length < 5) {
    //     throwError("Invalid email: Local part must be more than 5 characters", 422)
    // }
};

export default validateEmail;