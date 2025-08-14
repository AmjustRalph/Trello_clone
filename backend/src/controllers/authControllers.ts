
import type {Response, Request, NextFunction} from 'express';
import { registerUserService, loginUserService} from "../services/userServices.ts";
import handleResponse from "../utils/responsehandler.ts";

  

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    const user = await registerUserService(username, password, email)
    handleResponse(res, 201, user.message, user)
  } catch (error) {
    next(error)
  }
 
};




export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginResult = await loginUserService(email, password)
    handleResponse(res, 200, loginResult.message, loginResult)
  } catch(error){
    next(error)
  }
};





