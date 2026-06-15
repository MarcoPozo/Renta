import mysql2 from "mysql2/promise";
import { env } from "./env.js";

/*
 * Pool de conexiones MySQL (XAMPP en desarrollo).
 * Ojo: si root no tiene contraseña, DB_PASS debe quedar undefined —
 * un string vacío rompe la autenticación con mysql2.
 */
const db = mysql2.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS || undefined,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
