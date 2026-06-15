import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

// Seguridad: headers HTTP
app.use(helmet());

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS — abierto en desarrollo para que Expo (web y dispositivo) pueda conectar
app.use(
  cors({
    origin: env.CORS_ORIGIN ?? "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Rate limiting general
app.use(generalLimiter);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Renta API corriendo" });
});

// Rutas (versionadas: el móvil consume /api/v1)
app.use("/api/v1", router);

// Manejo centralizado de errores (siempre al final)
app.use(errorHandler);

export default app;
