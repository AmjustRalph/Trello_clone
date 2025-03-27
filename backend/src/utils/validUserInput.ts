// import throwError from "./throwError";


import { throwError } from "./throwError";

export const  validateUserInput = (name: string) => {
   // Check if username is a string
   if (typeof name !== 'string') {
   throwError('Invalid name: Must be a string', 400);
}

// Trim the username and check if it's empty
const trimmedUsername = name.trim();
if (trimmedUsername === '') {
    throwError('Invalid name: Must not be empty', 400);
}
    
// Check for numbers
if (/\d/.test(trimmedUsername)) {
    throwError('Invalid name: Must not contain numbers', 422);
}
 if (!/^[a-zA-Z ]*$/.test(trimmedUsername)) {
     throwError('Invalid name: Must contain only letters', 422);
 }

if (trimmedUsername.length < 2) {
    throwError('Invalid name: Must be at least 2 characters', 422);
    }
    
}
    

