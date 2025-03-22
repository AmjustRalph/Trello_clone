import { NextFunction } from "express";
import { throwError } from "./throwError";


const validateEmail = (email: string) => {
  
    if (!email || typeof email !== "string" || email == "") {
        throwError("Invalid email format: Email must be a non-empty string", 400);
    }

    const parts = email.split("@");

    if (parts.length !== 2) {
     throwError("Invalid email format: Must contain exactly one '@' symbol", 400);
    }

    const localPart = parts[0];

    if (/^\d+$/.test(localPart)) {
        throwError("Invalid email: Local part must not contain only numbers", 422);
    }

    if (localPart.length < 5) {
        throwError("Invalid email: Local part must be more than 5 characters", 422)
    }
};

export default validateEmail;