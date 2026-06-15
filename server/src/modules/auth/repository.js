import { randomUUID } from "crypto";
import db from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0] ?? null;
};

export const findUserById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0] ?? null;
};

export const createUser = async (data) => {
  const id = randomUUID();

  await db.execute(
    `INSERT INTO users (id, email, passwordHash, fullName, phone)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.email, data.passwordHash, data.fullName, data.phone ?? null],
  );

  return findUserById(id);
};
