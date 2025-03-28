// import throwError from "./throwError";


import { throwError } from "./throwError";

function validateUserInput(username: string) {
   // Check if username is a string
   if (typeof username !== 'string') {
   throwError('Invalid username: Must be a string', 400);
}

// Trim the username and check if it's empty
const trimmedUsername = username.trim();
if (trimmedUsername === '') {
    throwError('Invalid username: Must not be empty', 400);
}
    
// Check for numbers
if (/\d/.test(trimmedUsername)) {
    throwError('Invalid username: Must not contain numbers', 422);
}
 if (!/^[a-zA-Z ]*$/.test(trimmedUsername)) {
     throwError('Invalid username: Must contain only letters', 422);
 }

if (trimmedUsername.length < 5) {
    throwError('Invalid username: Must be at least 5 characters', 422);
    }
    
}
    


export default validateUserInput;