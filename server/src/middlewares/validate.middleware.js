/*
 * Middlewares de validación con Zod.
 * - validate(schema): valida req.body (POST/PUT/PATCH)
 * - validateQuery(schema): valida req.query (GET) — los query params
 *   siempre llegan como string, usar z.coerce en los schemas.
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return next(result.error);
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) return next(result.error);
  req.validatedQuery = result.data;
  next();
};
