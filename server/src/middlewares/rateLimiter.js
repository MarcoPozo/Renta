import rateLimit from "express-rate-limit";

// Límite general para toda la API
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "TOO_MANY_REQUESTS",
    message: "Demasiadas peticiones, intenta de nuevo más tarde",
  },
});

// Límite estricto para endpoints sensibles (login/registro)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "TOO_MANY_REQUESTS",
    message: "Demasiados intentos, espera unos minutos",
  },
});
