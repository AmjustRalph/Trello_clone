import {Response } from "express"


const handleResponse = <T>(res: Response, status: number, message: string, data?: T) => {
   return res.status(status).json({ status, message, ...(data !== undefined && { data }) });
  };

export default handleResponse;