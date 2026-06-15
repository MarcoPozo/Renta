import { Router } from "express";
import routerAuth from "../modules/auth/routes.js";

const router = Router();

// Auth Routes (register/login públicos, /me protegido dentro del módulo)
router.use("/auth", routerAuth);

export default router;
