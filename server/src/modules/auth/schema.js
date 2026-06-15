import { z } from "zod";

export const authSchema = {
  // POST /api/v1/auth/register
  register: z.object({
    email: z.string().email("Email inválido").toLowerCase(),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
      .regex(/[0-9]/, "Debe incluir al menos un número"),
    fullName: z.string().min(3, "Nombre muy corto").max(255),
    phone: z.string().max(50).optional(),
  }),

  // POST /api/v1/auth/login
  login: z.object({
    email: z.string().email("Email inválido").toLowerCase(),
    password: z.string().min(1, "La contraseña es obligatoria"),
  }),
};
