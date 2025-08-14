
import type { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}


const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;

  // Detect database-related errors and customize response
  if (error.code === "23505") { // Unique constraint violation (PostgreSQL)
    error.statusCode = 409;
    error.message = "Duplicate entry, please use a different value.";
} else if (error.code === "ECONNREFUSED") { // Database connection issue
    error.message = "Database connection failed.";
}

  res.status(error.statusCode).json({
    statusCode: error.statusCode, 
    message: error.message,
    //stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  })
  };

  export default globalErrorHandler;
