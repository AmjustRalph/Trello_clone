import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();


const pool = new Pool({
user: process.env.DB_USER,
host: process.env.DB_HOST,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined
});

export { pool };
    
    
