import { throwError } from "./throwError";

export const validateName = (name: string) => {
    // Check if username is a string
    if (typeof name !== 'string') {
       throwError('Invalid name: Must be a string', 400);
   }
   
   // Trim the username and check if it's empty
   const trimmedUsername = name.trim();
   if (trimmedUsername === '') {
       throwError('Invalid name: Must not be empty', 400);
   }
   
   
   if (trimmedUsername.length < 4) {
   throwError('Invalid name: Must be at least 2 characters', 422);
   }

}
