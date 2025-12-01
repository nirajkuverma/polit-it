import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
// Create a pool to the MySQL database
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  database: process.env.DB_DARABASE,
  waitForConnections: true,
});
