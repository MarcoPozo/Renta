import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { findUserById } from "../modules/auth/repository.js";

/*
 * Auth con JWT Bearer (no sesiones): el cliente guarda el token
 * y lo envía en el header Authorization de cada request.
 */
export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      error: "UNAUTHORIZED",
      message: "Inicia sesión antes",
    });
  }

  let payload;
  try {
    payload = jwt.verify(header.slice(7), env.JWT_SECRET);
  } catch {
    return res.status(401).json({
      ok: false,
      error: "UNAUTHORIZED",
      message: "Token inválido o expirado",
    });
  }

  try {
    // Un token puede ser válido pero apuntar a un usuario borrado —
    // el 401 hace que el cliente cierre la sesión automáticamente
    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "UNAUTHORIZED",
        message: "La sesión ya no es válida, inicia sesión de nuevo",
      });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};
