import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/throwError";


const notfoundHandler = (req: Request, res: Response, next: NextFunction) => {
    throwError(`Can't find ${req.originalUrl} on the server!`, 404)
}
  
export default notfoundHandler;