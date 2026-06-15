/*
 * Códigos de error de la API. Cada módulo agrega los suyos aquí
 * para que el front pueda reaccionar por código y no por mensaje.
 */
const ERRORS = {
  // Generales
  INVALID_PARAMS: "INVALID_PARAMS",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",

  // Auth
  EMAIL_IN_USE: "EMAIL_IN_USE",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
};

export default ERRORS;
