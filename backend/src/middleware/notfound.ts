import type { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/throwError.ts";


const notfoundHandler = (req: Request, _res: Response, _next: NextFunction) => {
    throwError(`Can't find ${req.originalUrl} on the server!`, 404)
}
  
export default notfoundHandler;