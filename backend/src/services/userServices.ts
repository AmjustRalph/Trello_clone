
import {pool} from "../config/db_connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { throwError} from "../utils/throwError";
import { NextFunction } from "express";
 



export const registerUserService = async (username: string, password: string, email: string) => {
const emailCheck = await pool.query(
"SELECT 1 FROM users WHERE email = $1",
[email]
);
if (emailCheck?.rowCount && emailCheck.rowCount > 0) {

throwError("Email already exist", 500);
}

const hashedPassword = await bcrypt.hash(password, 10);


const result = await pool.query(
"INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING username, email",
[username, hashedPassword, email]
);

const user = result.rows[0];

const token = jwt.sign(
{ id: user.userId, email: user.email },
process.env.JWT_SECRET as string,
{ expiresIn: "15min" }
);

return {
username: user.username,
email: user.email,
token: token
};

}

    
   
    

export const loginUserService = async (email: string, password: string, next: NextFunction) => {
    
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userCheck.rows.length === 0) {
        throwError("Invalid email", 401);
       
      }
      
    const user = userCheck.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
      throwError("Invalid  password", 401);
      }

    const token = jwt.sign({ id: user.userId, email: user.email}, process.env.JWT_SECRET as string, {
      expiresIn: "15min",
    });
    return { username: user.username, email: user.email, token };
  } catch (error) {
    next(error)
  }
  };
  
