import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

// Firma el token: aquí "nace" la sesión (el server no guarda nada)
export const signToken = (user) => {
  return jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

// Convierte una fila de users al DTO que consume el front (sin passwordHash)
export const toUserResponse = (user) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  phone: user.phone ?? null,
  avatarUrl: user.avatarUrl ?? null,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
