import { Request, Response, NextFunction } from "express";
import {validateEmail} from "../utils/validations";
import { validPassword } from "../utils/validations";
import { throwError } from "../utils/throwError";
import { validateUserInput } from "../utils/validations";

const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body) {
        throwError("Request body is missing",400);
    }
    const { username, password, email } = req.body;

    try {
        validateUserInput(username)
        validPassword(password)
        validateEmail(email)
         next()
    } catch (error) {
        next(error)
    }
};

export { validateRegisterUser };

    
    
    
    
    
const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    try {
        validateEmail(email)
        validPassword(password)

         next()
    }catch (error) {
        next(error)
    }
};

export {validateLoginUser};
