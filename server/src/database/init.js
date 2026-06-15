import db from "../config/db.js";

/*
 * Crea las tablas que falten (no borra nada — seguro de correr varias veces).
 * Uso: npm run db:init
 */
const init = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      passwordHash VARCHAR(255) NOT NULL,
      fullName VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NULL,
      avatarUrl VARCHAR(500) NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("✅ Tabla users lista");

  await db.end();
  process.exit(0);
};

init().catch((err) => {
  console.error("❌ Error inicializando la base:", err.message);
  process.exit(1);
});
