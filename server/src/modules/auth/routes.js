import { Router } from "express";
import {
  registerController,
  loginController,
  meController,
} from "./controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authLimiter } from "../../middlewares/rateLimiter.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";
import { authSchema } from "./schema.js";

const routerAuth = Router();

// authLimiter: límite estricto solo para login/registro (20 intentos / 15 min)
routerAuth.post(
  "/register",
  authLimiter,
  validate(authSchema.register),
  registerController,
);
routerAuth.post(
  "/login",
  authLimiter,
  validate(authSchema.login),
  loginController,
);
routerAuth.get("/me", requireAuth, meController);

export default routerAuth;
