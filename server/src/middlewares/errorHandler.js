import { ZodError } from "zod";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  // Error de validación Zod
  if (err instanceof ZodError) {
    logger.warn(`Validación fallida [${req.method} ${req.path}]`, {
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return res.status(400).json({
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Datos inválidos",
      details: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Error operacional controlado (AppError)
  if (err instanceof AppError) {
    logger.warn(
      `[${err.errorCode}] ${err.message} [${req.method} ${req.path}]`,
    );
    return res.status(err.statusCode).json({
      ok: false,
      error: err.errorCode,
      message: err.message,
    });
  }

  // Error inesperado (bug)
  logger.error(`Error inesperado [${req.method} ${req.path}]: ${err.message}`, {
    stack: err.stack,
  });

  return res.status(500).json({
    ok: false,
    error: "INTERNAL_ERROR",
    message: "Error interno del servidor",
  });
};
