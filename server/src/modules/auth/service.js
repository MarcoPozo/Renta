import bcrypt from "bcrypt";
import { findUserByEmail, createUser, findUserById } from "./repository.js";
import { signToken, toUserResponse } from "./utils.js";
import AppError from "../../utils/AppError.js";
import ERRORS from "../../utils/errors.js";

const SALT_ROUNDS = 12;

export const registerService = async (data) => {
  const existing = await findUserByEmail(data.email);

  if (existing) {
    throw new AppError("El email ya está en uso", 409, ERRORS.EMAIL_IN_USE);
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await createUser({ ...data, passwordHash });

  return {
    user: toUserResponse(user),
    accessToken: signToken(user),
  };
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  // Mismo error para email inexistente y contraseña mala:
  // no revelar cuál de los dos falló
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError(
      "Credenciales inválidas",
      401,
      ERRORS.INVALID_CREDENTIALS,
    );
  }

  return {
    user: toUserResponse(user),
    accessToken: signToken(user),
  };
};

export const getMeService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("Usuario no encontrado", 404, ERRORS.USER_NOT_FOUND);
  }

  return toUserResponse(user);
};
