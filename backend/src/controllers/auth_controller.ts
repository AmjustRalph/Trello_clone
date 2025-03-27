
import {Response, Request, NextFunction} from 'express';
import { registerUserService, loginUserService} from "../services/userServices";
import handleResponse from "../utils/ResponseHandler"

  

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    const user = await registerUserService(username, password, email)
    handleResponse(res, 201, "User Registered Successfully", user)
  } catch (error) {
    next(error)
  }
 
};




export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserService(email, password, next)
    handleResponse(res, 200, "Login Successful", token)
  } catch(error){
    next(error)
  }
};





