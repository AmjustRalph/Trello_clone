import type { Request, Response, NextFunction } from "express";
import validateEmail from "../utils/validEmail.ts";
import validUserName from "../utils/validUserInput.ts";
import { validPassword } from "../utils/validPassword.ts";
import { throwError } from "../utils/throwError.ts";

const validateRegisterUser = (req: Request, _res: Response, next: NextFunction) => {

    if (!req.body) {
        throwError("Request body is missing",400);
    }
    const { username, password, email } = req.body;

    try {
        validUserName(username)
        validPassword(password)
        validateEmail(email)
         next()
    } catch (error) {
        next(error)
    }
};

export { validateRegisterUser };

    
    
    
    
    
const validateLoginUser = (req: Request, _res: Response, next: NextFunction) => {
    const { email,password } = req.body;
    try {
        validateEmail(email)
        validPassword(password)

         next()
    }catch (error) {
        next(error)
    }
};

export {validateLoginUser};
