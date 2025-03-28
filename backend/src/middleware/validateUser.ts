import { Request, Response, NextFunction } from "express";
import validateEmail from "../utils/validEmail";
import validUserName from "../utils/validUserInput";
import { validPassword } from "../utils/validPassword";
import { throwError } from "../utils/throwError";

const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body) {
        throwError("Request body is missing",400);
    }
    const { username, password, email } = req.body;
    console.log( typeof password)

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
