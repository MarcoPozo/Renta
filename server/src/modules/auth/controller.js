import { registerService, loginService, getMeService } from "./service.js";

export const registerController = async (req, res, next) => {
  try {
    const data = await registerService(req.body);
    return res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};

export const meController = async (req, res, next) => {
  try {
    const data = await getMeService(req.user.id);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};
